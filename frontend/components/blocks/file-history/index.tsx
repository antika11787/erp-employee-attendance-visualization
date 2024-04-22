'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import { FileHistoryApi, DeleteFileApi } from '@/apiEndpoints/fileApi';
import { FileHistoryData, FileState, UserState, updateContentState } from '@/types/interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { saveFileID, removeFileID } from "@/redux/slices/FileSlice";
import Helper from '@/utils/helper';
import Search from '@/components/elements/searchbar';
import Modal from 'react-modal';
import { CgCloseR } from 'react-icons/cg';
import { saveContentLength } from '@/redux/slices/ContentSlice';
import { toast } from 'react-toastify';

const FileHistory = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const contentLength = useSelector(
        (state: updateContentState) => state.content.contentLength
    );
    const token = useSelector((state: UserState) => state.user.token);
    const { formatTimestamp } = Helper();
    const [files, setFiles] = useState<FileHistoryData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [fileId, setFileId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>("");
    const fileStateId = useSelector((state: FileState) => state.file._id);

    const openModal = (id: string) => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleDelete = async (id: string) => {
        if(id === fileStateId) {    
            toast.error("Cannot delete the file that is currently being viewed");
            return;
        }
        await DeleteFileApi(id);
        const updateFiles = files.filter((file: FileHistoryData) => file._id !== id);
        setFiles(updateFiles);
        dispatch(saveContentLength({ contentLength: updateFiles?.length || 0 }));
    }

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        try {
            const response = await FileHistoryApi(query);
            setFiles(response);
            dispatch(saveContentLength({ contentLength: response?.length || 0 }));
        } catch (error) {
            console.error("Error fetching files:", error);
            setFiles([]);
        }
    };
    

    useEffect(() => {
        FileHistoryApi(searchQuery).then((response) => {
            setFiles(response);
            dispatch(saveContentLength({ contentLength: response?.length || 0 }));
        })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setFiles([]);
            });
    }, [contentLength, dispatch, searchQuery]);

    return token ? (
        <div className='file-history-container'>
            <div className='file-history-heading-container'>
                <h1 className='file-history-heading'>File History</h1>
                <Search searchbarContainer='searchbar-container'
                    searchInputContainer='search-input-container'
                    searchInput='search-input'
                    searchIcon='search-icon'
                    placeholder='Search file...'
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }} />
            </div>
            <div className='files-container'>
                {files && files.length > 0 ? (
                    files.map((file: FileHistoryData) => {
                        return (
                            <div key={file._id} className='file'>
                                <div className='file-icon-name'>
                                    <Image src={'/excel.png'} alt="file-icon" width={20} height={20} />
                                    <p className='file-name'>{file.file_name}</p>
                                </div>
                                <div className='file-date-actions'>
                                    <p className='file-size'>{file.size} KB</p>
                                    <p className='file-date'>{formatTimestamp(file.createdAt)}</p>
                                    <p className='view'
                                        onClick={() => {
                                            localStorage.setItem("_id", file._id);
                                            dispatch(saveFileID({ _id: file._id }));
                                            router.push('/dashboard')
                                        }}>View Graphs</p>
                                    <p className='delete'
                                        onClick={() => {
                                            openModal(file._id)
                                            setFileId(file._id)
                                        }}>Delete
                                    </p>
                                    <Modal
                                        isOpen={isModalOpen}
                                        onRequestClose={closeModal}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal"
                                        style={{
                                            overlay: {
                                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                            },
                                            content: {
                                                width: "40%",
                                                height: "35%",
                                                margin: "auto",
                                                borderRadius: "10px",
                                                overflow: "auto",
                                            },
                                        }}
                                    >
                                        <div className="delete-modal-container">
                                            <h2 className="delete-modal-heading">Delete File</h2>
                                            <p className="delete-modal-description">
                                                Are you sure you want to delete this file? You'll have to upload it again to view the graphs.
                                            </p>
                                            <div className="delete-modal-button">
                                                <button
                                                    className="yes-button"
                                                    onClick={() => {
                                                        handleDelete(fileId);
                                                        closeModal();
                                                    }}
                                                >
                                                    Yes
                                                </button>
                                                <button className="no-button" onClick={closeModal}>
                                                    No
                                                </button>
                                            </div>
                                        </div>
                                        <CgCloseR className="close-button" onClick={closeModal} />
                                    </Modal>

                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='container'>
                        <Image src="/no-data.png" alt="no-data" width={200} height={200} />
                        <p className='no-data'>No file found!</p>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className='no-auth-container'>
            <Image src="/no-auth.png" alt="no-auth" width={200} height={200} />
            <p className='no-auth'>Please login to view file list</p>
        </div>
    )
}

export default FileHistory;
