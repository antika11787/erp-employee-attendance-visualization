import { Request, Response } from "express";
import { FileResponse, FilterType } from "../types/interface";
const { success, failure } = require("../utils/successError");
const totalEmployeeModel = require("../model/totalEmployee");
const fileModel = require("../model/file");
const {subtractDuration} = require("../utils/helper");

class EmployeeController {
  async setTotalEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const { total } = req.body;

      const newTotal = new totalEmployeeModel({
        total,
      });

      const saveTotal = await newTotal.save();

      return res
        .status(200)
        .send(success("Total employees set successfully", saveTotal));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
  async updateTotalEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const { total } = req.body;
      await totalEmployeeModel.updateOne({ total });

      return res
        .status(200)
        .send(success("Total employees updated successfully"));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getTotalEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const total = await totalEmployeeModel.findOne();
      return res
        .status(200)
        .send(success("Total employees fetched successfully", total));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getAllEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { search } = req.query;

      if (!id) {
        return res.status(400).send(failure("No file id provided"));
      }

      const files = await fileModel.findById(id);
      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      // Filter files based on search criteria (employee name)
      const filteredFiles = search
        ? files.file.filter(
            (emp: any) =>
              emp.employee
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              emp.employee_id.includes(search.toString())
          )
        : files.file;

      // Count occurrences of each employee ID in filtered files
      const employeeCountMap = new Map<string, number>();
      const employeeCheckinMap = new Map<string, any>();
      filteredFiles.forEach((emp: any) => {
        const employeeId = emp.employee_id;
        const checkInDate = emp.check_in;
        if (employeeCountMap.has(employeeId)) {
          employeeCountMap.set(
            employeeId,
            employeeCountMap.get(employeeId)! + 1
          );
        } else {
          employeeCountMap.set(employeeId, 1);
        }
        if (employeeCheckinMap.has(employeeId)) {
          employeeCheckinMap.get(employeeId)!.push(checkInDate);
        } else {
          // If the employeeId doesn't exist in the map, create a new array with the date
          employeeCheckinMap.set(employeeId, [checkInDate]);
        }
      });

      // Calculate averages for each employee in filtered files
      let employeeAverages: Record<string, any>[] = [];
      filteredFiles.forEach((emp: any) => {
        const employeeId = emp.employee_id;
        const count = employeeCountMap.get(employeeId)!;
        const avgWorkedHours = (emp.worked_hours / count).toFixed(2);
        const avgLateHours = (emp.late_hours / count).toFixed(2);
        const avgEarlyLeaveHours = (emp.early_leave_hours / count).toFixed(2);
        const avgOverTime = (emp.over_time / count).toFixed(2);

        const existingEmployee = employeeAverages.find(
          (e) => e.employee_id === employeeId
        );
        if (!existingEmployee) {
          employeeAverages.push({
            employee: emp.employee,
            employee_dates: employeeCheckinMap.get(employeeId),
            employee_id: emp.employee_id,
            worked_hours: parseFloat(avgWorkedHours),
            late_hours: parseFloat(avgLateHours),
            early_leave_hours: parseFloat(avgEarlyLeaveHours),
            over_time: parseFloat(avgOverTime),
          });
        } else {
          const employeeIndex = employeeAverages.findIndex(
            (e) => e.employee_id === employeeId
          );
          employeeAverages[employeeIndex].worked_hours +=
            parseFloat(avgWorkedHours);
          employeeAverages[employeeIndex].late_hours +=
            parseFloat(avgLateHours);
          employeeAverages[employeeIndex].early_leave_hours +=
            parseFloat(avgEarlyLeaveHours);
          employeeAverages[employeeIndex].over_time += parseFloat(avgOverTime);
        }
      });

      employeeAverages.forEach((emp: any) => {
        emp.employee_dates = emp.employee_dates.reverse();
      });

      return res
        .status(200)
        .send(success("Files fetched successfully", employeeAverages));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getSingleEmployeeData(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { search } = req.query;

      if (!id) {
        return res.status(400).send(failure("No file id provided"));
      }

      const files = await fileModel.findById(id);
      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      // Filter files based on search criteria (employee name)
      const filteredFiles = search
        ? files.file.filter(
            (emp: any) =>
              emp.employee
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              emp.employee_id.includes(search.toString())
          )
        : files.file;

      // Initialize arrays to store data for each employee
      const employeeDataMap = new Map<string, any>();

      // Populate employeeDataMap with data for each employee
      filteredFiles.forEach((emp: any) => {
        const employeeId = emp.employee_id;
        const checkInDate = emp.check_in;
        const workedHours = emp.worked_hours;
        const earlyLeaveHours = emp.early_leave_hours;
        const lateHours = emp.late_hours;
        const overtime = emp.over_time;

        if (employeeDataMap.has(employeeId)) {
          // If employee data already exists, push data to respective arrays
          employeeDataMap.get(employeeId).checkin_dates.push(checkInDate);
          employeeDataMap.get(employeeId).worked_hours.push(workedHours);
          employeeDataMap
            .get(employeeId)
            .early_leave_hours.push(earlyLeaveHours);
          employeeDataMap.get(employeeId).late_hours.push(lateHours);
          employeeDataMap.get(employeeId).over_time.push(overtime);
        } else {
          // If employee data doesn't exist, initialize arrays with current data
          employeeDataMap.set(employeeId, {
            checkin_dates: [checkInDate],
            worked_hours: [workedHours],
            early_leave_hours: [earlyLeaveHours],
            late_hours: [lateHours],
            over_time: [overtime],
          });
        }
      });

      // Convert map data to array of objects
      let employeeDataArray = Array.from(
        employeeDataMap,
        ([employeeId, data]) => ({
          employee_id: employeeId,
          checkin_dates: data.checkin_dates,
          worked_hours: data.worked_hours,
          early_leave_hours: data.early_leave_hours,
          late_hours: data.late_hours,
          over_time: data.over_time,
        })
      );

      employeeDataArray.forEach((emp: any) => {
        emp.checkin_dates = emp.checkin_dates.reverse();
        emp.worked_hours = emp.worked_hours.reverse();
        emp.early_leave_hours = emp.early_leave_hours.reverse();
        emp.late_hours = emp.late_hours.reverse();
        emp.over_time = emp.over_time.reverse();
      });

      return res
        .status(200)
        .send(success("Employee data fetched successfully", employeeDataArray));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getEmployeeDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { id, date } = req.params;
      if (!id || !date) {
        return res.status(400).send(failure("No id or date provided"));
      }

      const files = await fileModel.findById(id);

      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      const employees = files.file.filter((data: FileResponse) => {
        return data.check_in === date;
      });

      return res
        .status(200)
        .send(success("Files fetched successfully", employees));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  // async getSingleEmployeeData(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { id } = req.params;

  //     if (!id) {
  //       return res.status(400).send(failure("No id provided"));
  //     }

  //     const files = await fileModel.findById(id);
  //     if (!files) {
  //       return res.status(400).send(failure("No data found"));
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send(failure("Something went wrong", error));
  //   }
  // }

  async getAvgData(req: Request, res: Response): Promise<Response> {
    try {
      const { id, duration } = req.params;
      if (!id) {
        return res.status(400).send(failure("No id provided"));
      }
      if (!duration) {
        return res.status(400).send(failure("No duration provided"));
      }

      let files = await fileModel.findById(id);

      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      const employeeDataMap = new Map<string, any>();





      // Populate employeeDataMap with data for each employee
      files.file.forEach((emp: any) => {
        const checkInDate = emp.check_in;
        const workedHours = emp.worked_hours;
        const earlyLeaveHours = emp.early_leave_hours;
        const lateHours = emp.late_hours;
        const overtime = emp.over_time;

        if (employeeDataMap.has(checkInDate)) {
          // If employee data already exists, push data to respective arrays
          employeeDataMap.get(checkInDate).checkin_dates.push(checkInDate);
          employeeDataMap.get(checkInDate).worked_hours.push(workedHours);
          employeeDataMap
            .get(checkInDate)
            .early_leave_hours.push(earlyLeaveHours);
          employeeDataMap.get(checkInDate).late_hours.push(lateHours);
          employeeDataMap.get(checkInDate).over_time.push(overtime);
        } else {
          // If employee data doesn't exist, initialize arrays with current data
          employeeDataMap.set(checkInDate, {
            checkin_dates: [checkInDate],
            worked_hours: [workedHours],
            early_leave_hours: [earlyLeaveHours],
            late_hours: [lateHours],
            over_time: [overtime],
          });
        }
      });

      // Convert map data to array of objects
      let employeeDataArray = Array.from(
        employeeDataMap,
        ([checkin_dates, data]) => ({
          checkin_dates: checkin_dates,
          worked_hours: data.worked_hours,
          early_leave_hours: data.early_leave_hours,
          late_hours: data.late_hours,
          over_time: data.over_time,
        })
      );

      employeeDataArray.forEach((emp: any) => {
        emp.worked_hours = emp.worked_hours.reduce((a: any, b: any) => a + b, 0) / emp.worked_hours.length;
        emp.early_leave_hours = emp.early_leave_hours.reduce((a: any, b: any) => a + b, 0)/ emp.early_leave_hours.length;
        emp.late_hours =  emp.late_hours.reduce((a: any, b: any) => a + b, 0)/ emp.late_hours.length;
        emp.over_time = emp.over_time.reduce((a: any, b: any) => a + b, 0)/ emp.over_time.length;
      })

      employeeDataArray = employeeDataArray.slice(0, Number(duration));

      return res
        .status(200)
        .send(success("Files fetched successfully", employeeDataArray));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
}

export default new EmployeeController();
