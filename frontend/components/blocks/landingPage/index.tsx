'use client';

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
    const router = useRouter();
    const token = useSelector((state: any) => state.user.token);

    useEffect(() => {
        if (!token) {
            router.push("/login");
        } else {
            router.push("/dashboard");
        }
    }, [token, router]);

    return null;
}

export default LandingPage;
