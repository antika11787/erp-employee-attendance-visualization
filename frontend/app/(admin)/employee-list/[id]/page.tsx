'use client';

import Breadcrumb from '@/components/elements/breadcrumb';
import { useParams } from 'next/navigation';
import SingleEmployeeData from '@/components/blocks/single-employee-data';
import SingleEmployeeCharts from '@/components/blocks/single-employee-charts';
import Comparison from '@/components/blocks/comparison';
import { useSelector } from 'react-redux';
import { UserState } from '@/types/interface';
import Image from 'next/image';
import './style.scss';

const EmployeePage = () => {
    const { id } = useParams();
    const token = useSelector((state: UserState) => state.user.token);

    const breadcrumbItems = [
        { text: 'Dashboard', href: '/dashboard' },
        { text: 'Employee List', href: '/employee-list' },
        { text: `${id}`, href: `/employee-list/${id}` },
    ];

    return !token ? (
        <div className='no-auth-container-single'>
            <Image src="/no-auth.png" alt="no-auth" width={200} height={200} />
            <p className='no-auth-single'>Please login to view file list</p>
        </div>
    ) : (
        <div className="single-employee-page">
            <Breadcrumb items={breadcrumbItems} />
            {/* <SingleEmployeeData /> */}
            <SingleEmployeeCharts />
            {/* <Comparison /> */}
        </div>
    )
}

export default EmployeePage;
