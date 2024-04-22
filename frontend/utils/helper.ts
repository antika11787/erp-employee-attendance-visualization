import { DateTime } from "luxon";
import * as XLSX from "xlsx";

interface CheckInData {
  Employee?: string;
  "Employee ID"?: number;
  "Check In"?: string;
  "Worked Hours (H.M)"?: number;
  "Late Hours (H.M)"?: number;
  "Early Leave Hours (H.M)"?: number;
  "Over Time (H.M)"?: number;
  early?: number;
  late?: number;
  ontime?: number;
  [key: string]: any;
}

interface Employee {
  Employee: string;
  "Employee ID": number;
  "Check In": string;
  "Worked Hours (H.M)": number;
  "Late Hours (H.M)": number;
  "Early Leave Hours (H.M)": number;
  "Over Time (H.M)": number;
}

const Helper = () => {
  const formatDateToMonth = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const monthName: string = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return monthName;
  };

  const getMonthName = () => {
    const months = new Map();

    months.set("01", "January");
    months.set("02", "February");
    months.set("03", "March");
    months.set("04", "April");
    months.set("05", "May");
    months.set("06", "June");
    months.set("07", "July");
    months.set("08", "August");
    months.set("09", "September");
    months.set("10", "October");
    months.set("11", "November");
    months.set("12", "December");

    return months;
};

const getMonthInNumber = (month: string): string => {
  const months = new Map();

  months.set("January", "01");
  months.set("February", "02");
  months.set("March", "03");
  months.set("April", "04");
  months.set("May", "05");
  months.set("June", "06");
  months.set("July", "07");
  months.set("August", "08");
  months.set("September", "09");
  months.set("October", "10");
  months.set("November", "11");
  months.set("December", "12");

  return months.get(month) || "";
};

// const getMonthName = (monthNumber: string) => {
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
//   return months[parseInt(monthNumber, 10) - 1];
// };


  const formatDateToDay = (value: Date): void => {
    console.log("format", formatDateToDay(value));

    if (value instanceof Date) {
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const day = value.getDate();
      const month = months[value.getMonth()];
      const year = value.getFullYear();
      const formattedDate = `${year}-${month}-${day < 10 ? "0" + day : day}`;
      console.log("value", formattedDate);
    }
  };

  const extractDates = (checkIns: any[]): string[] => {
    const datesSet: Set<string> = new Set();

    checkIns.forEach((data) => {
      const checkInDate: Date = new Date(data?.employee_dates ?? "");
      const day = checkInDate.getDate();
      const month = checkInDate.toLocaleString("en-US", { month: "short" });
      datesSet.add(`${day} ${month}`);
    });

    return Array.from(datesSet);
  };

  const extractUniqueNames = (checkIns: any[]): string[] => {
    const namesSet: Set<string> = new Set();

    checkIns.forEach((data) => {
      namesSet.add(data.Employee);
    });

    return Array.from(namesSet);
  };

  const calculateAverageTime = (
    checkIns: CheckInData[],
    timeKey: string
  ): number => {
    let totalTime = 0;
    let totalEmployees = 0;

    // Iterate over the check-ins
    checkIns.forEach((checkIn) => {
      // Add the specified time for each employee to the total
      totalTime += checkIn[timeKey];
      totalEmployees++;
    });

    // Calculate the average time
    const averageTime = totalTime / totalEmployees;
    return averageTime;
  };

  const calculateAverageCheckInTime = (
    checkIns: CheckInData[],
    param: string // change type to string
  ) => {
    let total = 0;
    let count = 0;

    checkIns.forEach((checkIn) => {
      if (checkIn[param] !== undefined) {
        total += checkIn[param];
        count++;
      }
    });

    if (count === 0) {
      return 0;
    }

    return total / count;
  };

  const getInitials = (name: string | undefined) => {
    if (name === undefined) {
      return ""; // or handle the case where name is undefined
    }

    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };

  const getColor = (initial: string | undefined = "") => {
    const colors = [
      "#47466D",
      "#F8B195",
      "#F67280",
      "#C06C84",
      "#6C5B7B",
      "#355C7D",
    ];
    const index = initial.charCodeAt(1) % colors.length;
    return colors[index];
  };

  function parseTimeString(timeString: any) {
    return DateTime.fromFormat(timeString, "HH:mm:ss");
  }

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const amOrPm = date.getHours() < 12 ? "AM" : "PM";

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`;
  }

  return {
    formatDateToMonth,
    extractDates,
    extractUniqueNames,
    calculateAverageTime,
    getInitials,
    getColor,
    parseTimeString,
    formatTimestamp,
    calculateAverageCheckInTime,
    formatDateToDay,
    // getLatestDate,
    getMonthName,
    getMonthInNumber
  };
};

export default Helper;
