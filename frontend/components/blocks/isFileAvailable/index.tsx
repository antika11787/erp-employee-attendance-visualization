'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsFileAvailable = () => {
    const file = useSelector((state: any) => state.file);
    const router = useRouter();

    useEffect(() => {
        if (file) {
            router.push("/dashboard");
        } else {
            router.push("/upload-file");
        }
    }, [file, router]);

    return null;
}

export default IsFileAvailable;
