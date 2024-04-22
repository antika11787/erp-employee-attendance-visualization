'use client';

import { LuClipboardList } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { LuFileX, LuFileStack, LuUsers2 } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import "ag-charts-enterprise";
import "./index.scss";

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="sidebar-container">
            <div className="sidebar-profile-info" >
                <LuCalendarClock className="sidebar-heading-icon" />
                <h3 className="sidebar-heading-text">Attendance</h3>
            </div>
            <div className="sidebar-menu">
                <Link
                    href={'/dashboard'}
                    className="sidebar-menu-link">
                    <div className={`sidebar-menu-item ${pathName.endsWith('/dashboard') ? 'active' : ''}`}>
                        <LuClipboardList className="sidebar-menu-item-icon" />
                        <p className='sidebar-menu-item-text'>Dashboard</p>
                    </div>
                </Link>

                <Link
                    href={'/employee-list'}
                    className="sidebar-menu-link">
                    <div className={`sidebar-menu-item ${pathName.includes('/employee-list') ? 'active' : ''}`}>
                        <LuUsers2 className="sidebar-menu-item-icon" />
                        <p className='sidebar-menu-item-text'>Employee List</p>
                    </div>
                </Link>
                <Link
                    href={'/upload-file'}
                    className="sidebar-menu-link">
                    <div className={`sidebar-menu-item ${pathName.endsWith('/upload-file') ? 'active' : ''}`}>
                        <LuFileX className="sidebar-menu-item-icon" />
                        <p className='sidebar-menu-item-text'>Upload File</p>
                    </div>
                </Link>
                <Link
                    href={'/history'}
                    className="sidebar-menu-link">
                    <div className={`sidebar-menu-item ${pathName.endsWith('/history') ? 'active' : ''}`}>
                        <LuFileStack className="sidebar-menu-item-icon" />
                        <p className='sidebar-menu-item-text'>File history</p>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;
