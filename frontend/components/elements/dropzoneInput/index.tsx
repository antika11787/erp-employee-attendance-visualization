'use client';

import Image from 'next/image';
import './index.scss';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as xlsx from 'xlsx';

interface DropzoneInputProps {
    labelHeading: string
    labelSub: string
    labelLimit: string
    setFile?: any
    onChange?: any
}
const DropzoneInput: React.FC<DropzoneInputProps> = ({ labelHeading, labelSub, labelLimit, setFile }) => {


    const onDrop = useCallback((acceptedFiles: any) => {
        setFile(acceptedFiles[0]);
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <div className='upload-container'>
                        <Image src={'/cloud-data.png'} alt="file-upload" height={100} width={100} className='upload-image' />
                        <p className='upload-text upload-heading'>{labelHeading}</p>
                        <p className='upload-text upload-sub'>{labelSub}</p>
                        <p className='upload-text upload-limit'>{labelLimit}</p>
                    </div>
                ) : (
                    <div className='upload-container'>
                        <Image src={'/cloud-data.png'} alt="file-upload" height={100} width={100} className='upload-image' />
                        <p className='upload-text upload-heading'>{labelHeading}</p>
                        <p className='upload-text upload-sub'>{labelSub}</p>
                        <p className='upload-text upload-limit'>{labelLimit}</p>
                    </div>
                )}
            </div>

        </>
    )
}

export default DropzoneInput;
