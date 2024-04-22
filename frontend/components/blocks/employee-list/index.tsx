'use client';

import './index.scss';
import Helper from '@/utils/helper';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";
import { GetAllEmployeesApi } from '@/apiEndpoints/employeeApi';
import { FileResponse, FileState, UserState } from '@/types/interface';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EmployeeList = () => {
    const router = useRouter();
    const { getInitials, getColor } = Helper();
    const [data, setData] = useState<FileResponse[]>([]);
    const [displayedEmployees, setDisplayedEmployees] = useState<FileResponse[]>([]);
    const fileId = useSelector((state: FileState) => state.file._id);
    const token = useSelector((state: UserState) => state.user.token);

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllEmployeesApi(fileId);
            setData(response);
            // Initially display the first 20 employees
            setDisplayedEmployees(response?.slice(0, 20));
        };
        fetchData();
    }, [fileId]);

    return !token ? (
        <div className='no-auth-container'>
            <Image src="/no-auth.png" alt="no-auth" width={200} height={200} />
            <p className='no-auth'>Please login to view the employee list</p>
        </div>
    ) : !fileId ? (
        <div className="no-file">
            <Image src="/no-data.png" alt="No file" width={200} height={200} />
            <p className="no-file-text">No file selected yet...</p>
        </div>
    ) : (
        <div className='employee-list-page'>
            <h2 className='employee-list-heading'>Employee List</h2>
            <div className='employee-list-wrapper'>
                <div className='employee-list-container'>
                    <table className='employee-list-table'>
                        <thead className='table-header'>
                            <tr className='table-row'>
                                <th className='column-id'>ID</th>
                                <th className='column-name'>Name</th>
                                <th className='column-worked-hours'>Worked Hours<br></br>(Avg)</th>
                                <th className='column-late-hours'>Late Hours<br></br>(Avg)</th>
                                <th className='column-early-leave-hours'>Early Leave Hours<br></br>(Avg)</th>
                                <th className='column-overtime'>Overtime<br></br>(Avg)</th>
                                <th className='column-action'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {displayedEmployees.map(emp => (
                                <tr key={emp.employee_id} className='table-row'>
                                    <td className='column-id'>{emp.employee_id}</td>
                                    <td className='initial column-name-data' onClick={() => router.push(`/employee-list/${emp.employee_id}`)}>
                                        <div className="initial-circle" style={{ backgroundColor: getColor(getInitials(emp.employee)) }}>
                                            {getInitials(emp.employee)}
                                        </div>
                                        <p className='employee-name'>{emp.employee}</p>
                                    </td>
                                    <td className='column-worked-hours'>{emp.worked_hours.toFixed(2)}</td>
                                    <td className='column-late-hours'>{emp.late_hours.toFixed(2)}</td>
                                    <td className='column-early-leave-hours'>{emp.early_leave_hours.toFixed(2)}</td>
                                    <td className='column-overtime'>{emp.over_time.toFixed(2)}</td>
                                    <td className='column-action'>
                                        <Link href={'/employee-list/' + emp.employee_id}>
                                            <FaEye className='eye-icon' />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeList;
