'use client';
import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import './index.scss';
import { FileResponse } from "@/types/interface";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EmployeeData = ({ employee, dates, value }: { employee: FileResponse[], dates: string[], value: Value }) => {
    const data = {
        labels: employee?.map((data) => data.employee_id),
        datasets: [
            {
                label: 'Late Hours',
                data: employee?.map((data) => data.late_hours),
                backgroundColor: '#3D84A7BB',
                borderColor: '#3D84A7',
                borderWidth: 1
            },
            {
                label: 'Early Leave Hours',
                data: employee?.map((data) => data.early_leave_hours),
                backgroundColor: '#ABEDD8BB',
                borderColor: '#ABEDD8',
                borderWidth: 1
            },
            {
                label: 'Overtime',
                data: employee?.map((data) => data.over_time),
                backgroundColor: '#46CDCFBB',
                borderColor: '#46CDCF',
                borderWidth: 1
            }
        ],
    };

    const options = {
        plugins: {
            title: {
                text: `Late Hours, Early Leave Hours & Overtime for Each Employee`,
                display: true,
                font: {
                    size: 16,
                }
            },
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            },
        }
    };

    useEffect(() => {
        const containerBody = document.querySelector('.containerBody') as HTMLDivElement;
        if (containerBody) {
            if (data?.labels?.length > 5) {
                containerBody.classList.add('wideContainer');
            } else {
                containerBody.classList.remove('wideContainer');
            }

            const existingChart = Chart.getChart(containerBody.querySelector('.canvas') as HTMLCanvasElement);
            if (existingChart) {
                existingChart.destroy();
            }
            new Chart(containerBody.querySelector('.canvas') as HTMLCanvasElement, {
                type: 'bar',
                data: data,
                options: options
            });
        }
    }, [employee, options]);

    return (
        <div className="chartCard">
            <div className="chartBox">
                <div className="barContainer custom-scrollbar">
                    <div className="containerBody">
                        <canvas className="canvas"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeData;
