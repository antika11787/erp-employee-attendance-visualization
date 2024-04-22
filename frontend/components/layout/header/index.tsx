'use client';

import Search from '@/components/elements/searchbar';
import { RiShutDownLine } from "react-icons/ri";
import Image from 'next/image';
import './index.scss';
import { useEffect, useRef, useState } from 'react';
import { GetAllEmployeesApi } from '@/apiEndpoints/employeeApi';
import { FileResponse, FileState, UserState } from '@/types/interface';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { removeLogin } from '@/redux/slices/UserSlice';

const Header = () => {
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useDispatch();
    const user = useSelector((state: UserState) => state.user);
    const fileId = useSelector((state: FileState) => state.file._id);
    const token = useSelector((state: UserState) => state.user.token);
    const searchRef = useRef<HTMLDivElement>(null);
    const [employee, setEmployee] = useState<FileResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showResult, setShowResult] = useState<boolean>(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setShowResult(query.trim().length > 0);
    }

    const logout = () => {
        dispatch(removeLogin());
        router.push('/login');
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllEmployeesApi(fileId, searchQuery);
            setEmployee(response);
        };
        fetchData();
    }, [searchQuery])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResult(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowResult(false);
    }, [pathName]);

    return (
        <div className="header-wrapper">
            <div className='header-container'
                ref={searchRef}>
                <Search searchbarContainer='searchbar-container'
                    searchInputContainer='search-input-container'
                    searchInput='search-input'
                    searchIcon='search-icon'
                    placeholder='Search employee'
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                />
                {showResult && (
                    employee && employee.length > 0 ? (
                        <div className='search-result-wrapper custom-scrollbar'>
                            {employee.map((emp) => (
                                <div key={emp.employee_id} className='search-employee'
                                    onClick={() => {
                                        router.push(`/employee-list/${emp.employee_id}`)
                                        setSearchQuery("");
                                    }}>
                                    <p className='search-employee-name'>{emp.employee}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='search-result-wrapper'>
                            <p className='search-employee'>No result found</p>
                        </div>
                    )
                )}

                <div className='header-content'>
                    {token ? (
                        <>
                            <div className='image-content'>
                                <Image src="/user.png" alt="check-in" width={38} height={38} />
                                <div className='admin-info'>
                                    <p className='admin-name'>{user.username}</p>
                                    <p className='admin-role'>{user.role}</p>
                                </div>
                            </div>
                            <div className='vertical-line'></div>
                            <RiShutDownLine className='shut-down'
                                onClick={() => {
                                    dispatch(removeLogin());
                                    router.push('/login');
                                }} />
                        </>
                    ) : (
                        <>
                            <button className='login-btn'
                                onClick={() => router.push('/login')}>
                                Login
                            </button>
                            <button className='signup-btn'
                                onClick={() => router.push('/signup')}>
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;
