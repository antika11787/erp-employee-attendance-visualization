'use client';

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables, defaults, PluginOptionsByType } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Image from "next/image";
import Helper from "@/utils/helper";
import HighLow from "@/data/highLow";
import januaryCheckIns from "@/data/januaryCheckIns";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./index.scss";
import Clock from "@/components/elements/clock";
import { BiSolidEditAlt } from "react-icons/bi";
import { totalCheckInApi, totalLateApi, GetUniqueDatesApi } from "@/apiEndpoints/fileApi";
import { GetTotalEmployeeApi, UpdateTotalEmployeeApi, GetEmployeeDetailsApi, getAvgDataApi } from "@/apiEndpoints/employeeApi";
import { useSelector } from "react-redux";
import { FileResponse, FileState, UserState, totalEmployeeResponse } from "@/types/interface";
import EditModal from "../editModal";
import EmployeeData from "../id-params";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font = {
    size: 20,
    weight: 'bold'
};
defaults.plugins.title.color = "black";

const ReactChart = () => {
    const fileId = useSelector((state: FileState) => state.file._id);
    const token = useSelector((state: UserState) => state.user.token);
    const { calculateAverageTime } = Helper();
    const [isClient, setIsClient] = useState<boolean>(false);
    const [value, onChange] = useState<Value>(new Date());
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [totalCheckIn, setTotalCheckIn] = useState<number | null>(null);
    const [totalLate, setTotalLate] = useState<number | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(-1);
    const [dates, setDates] = useState<string[]>([]);
    const [employee, setEmployee] = useState<FileResponse[]>([]);
    const [avgData, setAvgData] = useState<any>([]);

    const [selectedDuration, setSelectedDuration] = useState("3");

    const handleChangeDuration = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDuration(event.target.value);
    };

    const avgEarlyLeave = avgData.reduce((total: number, item: any) => total + item.early_leave_hours, 0) / avgData.length;
    const avgOverTime = avgData.reduce((total: number, item: any) => total + item.over_time, 0) / avgData.length;
    const avgLateHours = avgData.reduce((total: number, item: any) => total + item.late_hours, 0) / avgData.length;

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const day = value instanceof Date ? value.getDate() : undefined;
    const month = value instanceof Date ? months[value.getMonth()] : undefined;
    const year = value instanceof Date ? value.getFullYear() : undefined;
    const formattedDate = `${year}-${month}-${Number(day ?? '01') < 10 ? '0' + (day ?? '01') : (day ?? '01')}`;
    console.log("value", formattedDate);

    useEffect(() => {
        setIsClient(true);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [checkInData, lateData, totaldata, employeeDetails] = await Promise.all([
                    totalCheckInApi(fileId, formattedDate),
                    totalLateApi(fileId, formattedDate),
                    GetTotalEmployeeApi(),
                    GetEmployeeDetailsApi(fileId, formattedDate),

                ]);
                setTotalCheckIn(checkInData);
                setTotalLate(lateData);
                setEmployee(employeeDetails);
                setTotal(totaldata.total);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [value, fileId, formattedDate]);

    console.log("emp", employee);

    useEffect(() => {
        GetUniqueDatesApi(fileId).then((data) => {
            setDates(data);
        })
    }, [fileId]);

    useEffect(() => {
        if (fileId) {
            getAvgDataApi(fileId, selectedDuration).then((data: any) => {
                setAvgData(data);
            }).catch(error => {
                console.error("Error fetching average data:", error);
            });
        }
    }, [selectedDuration, fileId]);


    return !token ? (
        <div className='no-auth-container'>
            <Image src="/no-auth.png" alt="no-auth" width={200} height={200} />
            <p className='no-auth'>Please login to view the graphs</p>
        </div>
    ) : !fileId ? (
        <div className="no-file">
            <Image src="/no-file.png" alt="No file" width={200} height={200} />
            <p className="no-file-text">No file selected yet...</p>
        </div>
    ) : (
        <div className="home-container">
            <div className="top-container">
                <div className="calendar custom-scrollbar">
                    <Calendar
                        onChange={onChange}
                        value={value}
                        className={"custom-calendar"}
                        tileClassName={({ date, view }) => {
                            const day = date.getDate();
                            const month = date.getMonth() + 1;
                            const year = date.getFullYear();
                            const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

                            if (view === "month" && dates?.includes(formattedDate)) {
                                return 'date-highlight';
                            }
                            return '';
                        }}
                    />
                </div>
                <div className="params">
                    <div className="params-box check-in">
                        {isClient && <Clock />}
                    </div>
                    <div className="params-box total-wrapper">
                        <div className="total-container">
                            <Image src="/employee.png" alt="employees" width={70} height={70} />
                            <div className="total">
                                <p className="total-number">{total === -1 ? "Not Set" : total}</p>
                                <p className="total-employee">Total Employee</p>
                            </div>
                            <BiSolidEditAlt className="total-employee-update-icon"
                                onClick={() => {
                                    openEditModal();
                                }} />
                            <EditModal
                                totalCheckIn={totalCheckIn ?? 0}
                                isEditModalOpen={isEditModalOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                                editModalTotal={total}
                                setTotal={setTotal}
                            />
                        </div>
                    </div>
                    <div className="params-box total-wrapper">
                        <div className="total-container">
                            <Image src="/mobile.png" alt="checked-in" width={70} height={70} />
                            <div className="total">
                                <p className="total-number">{totalCheckIn}</p>
                                <p className="total-employee">Checked in</p>
                            </div>
                        </div>
                    </div>
                    <div className="params-box total-wrapper">
                        <div className="total-container">
                            <Image src="/running.png" alt="running" width={70} height={70} />
                            <div className="total">
                                <p className="total-number">{totalLate}</p>
                                <p className="total-employee">Total Late</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-card check-in-chart">
                <EmployeeData employee={employee} dates={dates} value={value} />
            </div>
            <div className="data-card check-in-doughnut">
                <Doughnut
                    data={{
                        labels: ["Absent", "Present"],
                        datasets: [
                            {
                                data: [total == -1 ? 0 : total - (totalCheckIn ?? 0), totalCheckIn],
                                backgroundColor: ["#3D84A7", "#ABEDD8"],
                                borderColor: "transparent",
                                borderRadius: 5,
                                spacing: 2,
                            }
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: `Employee Attendance for ${formattedDate}`,
                                display: true,
                                font: {
                                    size: 16,
                                }
                            },
                        },
                        layout: {
                            padding: 20
                        }
                    }}
                />
            </div>
            <div className="overview">
                <p className="overview-text">Overview</p>
                <div className="overview-dropdown-container">
                    <p className="overview-dropdown-text">Select Duration</p>
                    <select value={selectedDuration} onChange={handleChangeDuration} className="overview-heading-dropdown">
                        <option value="3">Last 3 days</option>
                        <option value="7">Last 7 days</option>
                        <option value="15">Last 15 days</option>
                    </select>
                </div>
            </div>
            <div className="data-card pie-chart">
                <Pie
                    data={{
                        labels: ["Late Hours", "Early Hours", "Overtime"],
                        datasets: [
                            {
                                data: [avgLateHours, avgEarlyLeave, avgOverTime],
                                backgroundColor: ["#3D84A7", "#ABEDD8", "#46CDCF"],
                                borderColor: "transparent",
                                borderRadius: 5,
                            }
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: ['Daily Employee Attendance', `Parameters for the last ${selectedDuration} days`],
                                display: true,
                                font: {
                                    size: 14,
                                }
                            },
                        },
                        layout: {
                            padding: 20
                        }
                    }}
                />
            </div>
            <div className="data-card bar-chart">
                <Bar
                    data={{
                        labels: avgData.map((data: any) => data.checkin_dates),
                        datasets: [
                            {
                                label: "Late hours",
                                data: avgData.map((data: any) => data.late_hours),
                                backgroundColor: "#3D84A7",
                                borderColor: "#3D84A7",
                            },
                            {
                                label: "Early leave hours",
                                data: avgData.map((data: any) => data.early_leave_hours),
                                backgroundColor: "#46CDCF",
                                borderColor: "#46CDCF",
                            },
                            {
                                label: "Overtime",
                                data: avgData.map((data: any) => data.over_time),
                                backgroundColor: "#ABEDD8",
                                borderColor: "#ABEDD8",
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: `Daily Employee Attendance Parameters for the last ${selectedDuration} days`,
                            },
                        },
                        layout: {
                            padding: 20
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: true
                                }
                            },
                            y: {
                                grid: {
                                    display: true
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ReactChart;
