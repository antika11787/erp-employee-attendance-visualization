'use client';

import './index.scss';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Helper from '@/utils/helper';
import { BsFilterRight } from "react-icons/bs";
import { FileResponse, FileState } from '@/types/interface';
import { useSelector } from 'react-redux';
import { GetAllEmployeesApi } from '@/apiEndpoints/employeeApi';

const SingleEmployeeData = () => {
    const { getInitials, getColor } = Helper();
    const { id } = useParams();

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [data, setData] = useState<FileResponse>();
    const fileId = useSelector((state: FileState) => state.file._id);

    const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllEmployeesApi(fileId);
            const employee = response.find((emp: FileResponse) => emp.employee_id === id);
            setData(employee);
        };
        fetchData();
    }, [])

    console.log("dddd", data)

    return (
        <div className="single-employee-data">
            <div className='image-name'>
                <div className="initial-circle" style={{ backgroundColor: getColor(getInitials(data?.employee)) }}>
                    {getInitials(data?.employee)}
                </div>
                <h1 className='employee-name'>{data?.employee}</h1>
            </div>
            <div className='filter-wrapper'>
                <div className='filters'>
                    <BsFilterRight className='filter-icon' />
                    <p className='filters-text'>Filters</p>
                </div>
                <select value={selectedYear} onChange={handleChangeYear} className="single-employee-dropdown">
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <select value={selectedMonth} onChange={handleChangeMonth} className="single-employee-dropdown">
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                </select>
            </div>
        </div>
    )
}

export default SingleEmployeeData;
