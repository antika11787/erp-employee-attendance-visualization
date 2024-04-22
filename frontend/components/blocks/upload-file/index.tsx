'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import DropzoneInput from '@/components/elements/dropzoneInput';
import { MdCloudDone } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { UploadFileApi } from "@/apiEndpoints/fileApi";
import { useDispatch, useSelector } from "react-redux";
import { saveFileID } from "@/redux/slices/FileSlice";
import './index.scss';
import { FileState, UserState } from '@/types/interface';
import { TbCloudUpload } from 'react-icons/tb';
import { toast } from 'react-toastify';

const UploadFile = () => {
    const router = useRouter();
    const [file, setFile] = useState<any>(null);
    const token = useSelector((state: UserState) => state.user.token);
    const fileTypes: string[] = ["xls", "xlsx", "xlsm", "xlsb", "xltx"];
    const dispatch = useDispatch();

    useEffect(() => {
        const storedId = localStorage.getItem("_id");
        if (storedId) {
            dispatch(saveFileID({ _id: storedId }));
        }
    }, [file]);

    return token ? (
        <div className='upload-file'>
            <div className='upload-file-heading-container'>
                <h1 className='upload-file-heading'>Upload File</h1>
                <TbCloudUpload className='upload-icon' />
            </div>
            <div className="upload-wrapper">
                <div className='upload-container'>
                    <DropzoneInput
                        labelHeading="Drag & Drop"
                        labelSub="Your files here or browse to upload"
                        labelLimit="Upload only excel files with max size 25 MB"
                        setFile={setFile}
                    />
                </div>
                <div className='uploaded-image'>
                    {file ? (
                        <>
                            <div className='excel-file-container'>
                                <div className='excel-file'>
                                    <Image
                                        src={'/excel.png'}
                                        width={40}
                                        height={40}
                                        alt="excel-file"
                                        className="excel-file-image"
                                    />
                                    <div className='excel-file-info'>
                                        <p className='excel-file-name'>{file.name}</p>
                                        <p className='excel-file-size'>{file.size / 1000} KB</p>
                                    </div>
                                </div>
                                {/* <MdCloudDone className='upload-success' /> */}
                                <p className='upload-success-text'
                                    onClick={
                                        async () => {
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        if (!file) {
                                            toast.error("Please select a file to upload");
                                            return;
                                        }

                                        if(!fileTypes.includes(file.name.split('.').pop())) {
                                            toast.error("Please upload an excel file");
                                            return;
                                        }

                                        const response = await UploadFileApi(formData)
                                        localStorage.setItem("_id", response._id);
                                        dispatch(saveFileID({ _id: response._id }));
                                        router.push('/dashboard');
                                    }}>Upload</p>
                            </div>
                        </>
                    ) : (
                        <div className='excel-file-none'>
                            <p className='excel-file-text'>File will appear here. Click on the file to see the graphs.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    ) : (
        <div className='no-auth-container'>
            <Image src="/no-auth.png" alt="no-auth" width={200} height={200} />
            <p className='no-auth'>Please login to upload file</p>
        </div>
    )
}

export default UploadFile;
