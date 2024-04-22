'use client';

import './index.scss';
import januaryCheckIns from '@/data/januaryCheckIns';
import Helper from '@/utils/helper';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    defaults
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { BsFilterRight } from 'react-icons/bs';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font = {
    size: 20,
    weight: 'bold'
};
defaults.plugins.title.color = "black";

const Comparison = () => {
    const { extractDates, calculateAverageTime } = Helper();
    const labels = extractDates(januaryCheckIns);

    const [selectedValue, setSelectedValue] = useState('last 2 days');

    const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className='comparison-charts'>
            <div className='comparison-header'>
                <h2>Compare Performace</h2>
                <div className='filter-wrapper'>
                    <div className='filters'>
                        <BsFilterRight className='filter-icon' />
                        <p className='filters-text'>Filters</p>
                    </div>
                    <select value={selectedValue} onChange={handleChangeValue} className="single-employee-dropdown">
                        <option value="last 2 days">last 2 days</option>
                        <option value="last 5 days">last 5 days</option>
                        <option value="last 15 days">last 15 days</option>
                        <option value="last 2 months">last 2 months</option>
                    </select>
                </div>
            </div>
            <div className='comparison-charts-container'>
                <div className='single-data-card overtime-vs-late'>
                    <Doughnut
                        data={{
                            labels: ["Jan 1", "jan 2", "jan 3", "jan 4", "jan 5"],
                            datasets: [
                                {
                                    data: [7, 9, 8, 9, 10],
                                    backgroundColor: ["#47466D", "#3D84A7", "#46CDCF", "#ABEDD8", "#dbfff5"],
                                    borderColor: "transparent",
                                }
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Wokred Hours',
                                },
                            },
                            layout: {
                                padding: 10,
                            }
                        }}
                    />
                </div>
                <div className='single-data-card overtime-vs-late'>
                    <Doughnut
                        data={{
                            labels: ["Jan 1", "jan 2", "jan 3", "jan 4", "jan 5"],
                            datasets: [
                                {
                                    data: [0, 0.5, 0.5, 0.5, 0.5],
                                    backgroundColor: ["#47466D", "#3D84A7", "#46CDCF", "#ABEDD8", "#dbfff5"],
                                    borderColor: "transparent",
                                }
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Late Hours',
                                },
                            },
                            layout: {
                                padding: 10,
                            }
                        }}
                    />
                </div>
                <div className='single-data-card overtime-vs-late'>
                    <Doughnut
                        data={{
                            labels: ["Jan 1", "jan 2", "jan 3", "jan 4", "jan 5"],
                            datasets: [
                                {
                                    data: [0.5, 0.5, 0.5, 0.5, 0.5],
                                    backgroundColor: ["#47466D", "#3D84A7", "#46CDCF", "#ABEDD8", "#dbfff5"],
                                    borderColor: "transparent",
                                }
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Early Leave Hours',
                                },
                            },
                            layout: {
                                padding: 10,
                            }
                        }}
                    />
                </div>
                <div className='single-data-card overtime-vs-late'>
                    <Doughnut
                        data={{
                            labels: ["Jan 1", "jan 2", "jan 3", "jan 4", "jan 5"],
                            datasets: [
                                {
                                    data: [0.33, 0.12, 0.43, 0.12, 0.19],
                                    backgroundColor: ["#47466D", "#3D84A7", "#46CDCF", "#ABEDD8", "#dbfff5"],
                                    borderColor: "transparent",
                                }
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Overtime',
                                },
                            },
                            layout: {
                                padding: 10,
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default Comparison;
