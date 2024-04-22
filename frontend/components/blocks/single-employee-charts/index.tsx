import "./index.scss";
import {
  ChartDataset,
  Chart as ChartJS,
  defaults,
  Filler,
} from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import januaryCheckIns from "@/data/januaryCheckIns";
import Helper from "@/utils/helper";
import { useEffect, useState } from "react";
import { FileResponse, FileState } from "@/types/interface";
import { useSelector } from "react-redux";
import { BsFilterRight } from "react-icons/bs";
import {
  GetAllEmployeesApi,
  GetSingleEmployeeDataApi,
} from "@/apiEndpoints/employeeApi";
import { useParams } from "next/navigation";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font = {
  size: 20,
  weight: "bold",
};
defaults.plugins.title.color = "black";

ChartJS.register(Filler);

interface CustomChartDataset extends ChartDataset<"line", number[]> {
  lineTension: number;
}

const SingleEmployeeCharts = () => {
  const {
    extractDates,
    getInitials,
    getColor,
    getMonthName,
    getMonthInNumber,
  } = Helper();
  const { id } = useParams();
  //   const labels = extractDates(januaryCheckIns);
  const [data, setData] = useState<FileResponse>();
  const [singleData, setSingleData] = useState<any>();
  const fileId = useSelector((state: FileState) => state.file._id);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAllEmployeesApi(fileId);
      const employee = response?.find(
        (emp: FileResponse) => emp.employee_id === id
      );
      setData(employee);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetSingleEmployeeDataApi(fileId);
      const employee = response?.find((emp: any) => emp.employee_id === id);
      setSingleData(employee);
    };
    fetchData();
  }, []);

  let indexArray: number[] = [];
  singleData?.checkin_dates?.map((date: any, index: number) => {
    if (
      date?.split("-")[1] === getMonthInNumber(selectedMonth) &&
      date?.split("-")[0] === selectedYear
    ) {
      indexArray.push(index);
    }
  });

  const uniqueYears = Array.from(
    new Set(data?.employee_dates?.map((date: any) => date?.split("-")[0]))
  );

  const uniqueMonths = Array.from(
    new Set(
      data?.employee_dates?.map((date: any) => {
        const month = date?.split("-")[1];
        const monthMap = getMonthName();
        return monthMap.get(month);
      })
    )
  );

  const filteredDates = data?.employee_dates
    ?.filter((date) => {
      const monthNumber = date?.split("-")[1];
      return monthNumber === getMonthInNumber(selectedMonth);
    })
    .map((date) => {
      const day = date.split("-").pop();
      const monthAbbreviation = selectedMonth.substring(0, 3);
      return `${monthAbbreviation}-${day}`;
    });
  // .sort((a, b) => {
  //   if (a < b) return -1;
  //   if (a > b) return 1;
  //   return 0;
  // });
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      setSelectedYear(selectedYear);
      setSelectedMonth(selectedMonth);
    } else {
      setSelectedMonth(uniqueMonths[uniqueMonths.length - 1]);
      setSelectedYear(uniqueYears[uniqueYears.length - 1]);
    }
  }, [uniqueMonths, uniqueYears]);

  return (
    <>
      <div className="single-employee-data">
        <div className="image-name">
          <div
            className="initial-circle"
            style={{ backgroundColor: getColor(getInitials(data?.employee)) }}
          >
            {getInitials(data?.employee)}
          </div>
          <h1 className="employee-name">{data?.employee}</h1>
        </div>
        <div className="filter-wrapper">
          <div className="filters">
            <BsFilterRight className="filter-icon" />
            <p className="filters-text">Filters</p>
          </div>
          <select
            value={selectedYear}
            onChange={handleChangeYear}
            className="single-employee-dropdown"
          >
            {uniqueYears?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={handleChangeMonth}
            className="single-employee-dropdown"
          >
            {uniqueMonths?.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="single-employee-charts">
        <div className="single-data-card work-hour">
          <Line
            data={{
              labels: filteredDates,
              datasets: [
                {
                  label: "Worked Hours",
                  data: indexArray.map(
                    (index) => singleData?.worked_hours[index]
                  ),
                  backgroundColor: "rgba(71,70,109,0.3)",
                  borderColor: "#47466D",
                  lineTension: 0.5,
                  fill: true,
                } as CustomChartDataset,
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Worked Hours",
                },
              },
              layout: {
                padding: 20,
              },
            }}
          />
        </div>
        <div className="single-data-card late-hour">
          <Line
            data={{
              labels: filteredDates,
              datasets: [
                {
                  label: "Late Hours",
                  data: indexArray.map(
                    (index) => singleData?.late_hours[index]
                  ),
                  backgroundColor: "rgba(71,70,109,0.3)",
                  borderColor: "#47466D",
                  lineTension: 0.5,
                  fill: true,
                } as CustomChartDataset,
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Late Hours",
                },
              },
              layout: {
                padding: 20,
              },
            }}
          />
        </div>
        <div className="single-data-card early-leave">
          <Line
            data={{
              labels: filteredDates,
              datasets: [
                {
                  label: "Early Leave Hours",
                  data: indexArray.map(
                    (index) => singleData?.early_leave_hours[index]
                  ),
                  backgroundColor: "rgba(71,70,109,0.3)",
                  borderColor: "#47466D",
                  lineTension: 0.5,
                  fill: true,
                } as CustomChartDataset,
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Early Leave Hours",
                },
              },
              layout: {
                padding: 20,
              },
            }}
          />
        </div>
        <div className="single-data-card overtime">
          <Line
            data={{
              labels: filteredDates,
              datasets: [
                {
                  label: "Overtime",
                  data: indexArray.map((index) => singleData?.over_time[index]),
                  backgroundColor: "rgba(71,70,109,0.3)",
                  borderColor: "#47466D",
                  lineTension: 0.5,
                  fill: true,
                } as CustomChartDataset,
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Overtime",
                },
              },
              layout: {
                padding: 20,
              },
            }}
          />
        </div>
        <div className="single-data-card overtime-vs-late">
          <Bar
            data={{
              labels: filteredDates,
              datasets: [
                {
                  label: "Overtime",
                  data: indexArray.map((index) => singleData?.over_time[index]),
                  backgroundColor: "#3D84A7",
                  borderColor: "transparent",
                },
                {
                  label: "Late hours",
                  data: indexArray.map(
                    (index) => singleData?.late_hours[index]
                  ),
                  backgroundColor: "#46CDCF",
                  borderColor: "transparent",
                },
              ],
            }}
            options={{
              indexAxis: "x" as const,
              elements: {
                bar: {
                  borderWidth: 2,
                  borderRadius: 3.5,
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  position: "right" as const,
                },
                title: {
                  display: true,
                  text: "Overtime vs Late Hours",
                },
              },
              layout: {
                padding: 20,
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SingleEmployeeCharts;
