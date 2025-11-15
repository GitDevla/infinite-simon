import { Link, useSearchParams } from "react-router-dom";
import { Backend } from "../util/Backend";
import { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";

export default function VerifyEmailScreen() {
    const [searchParams, _] = useSearchParams();
    const token = searchParams.get("token") || "";
    const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
    
    useEffect(() => {
        const verifyEmail = async () => {
            const response = await Backend.verifyEmail(token);
            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        };

        verifyEmail();
    }, [token]);


    return (
        <Layout header="Verify Email">
            <div className="max-w-[500px] mx-auto text-center">
                {status === "pending" && <p>Verifying your email...</p>}
                {status === "success" && <p className="text-simon-green">Your email has been successfully verified!</p>}
                {status === "error" && <p className="text-red-500">Email verification failed. The token may be invalid or expired.</p>}
                <Link to="/">
                    <button className="mt-4 px-4 py-2 bg-simon-blue text-white rounded-lg">
                        Go to Home
                    </button>
                </Link>
            </div>  
        </Layout>
    );
}