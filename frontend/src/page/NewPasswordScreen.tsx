import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Backend } from "../util/Backend";
import Layout from "../component/Layout/Layout";
import FloatingInput from "../component/Atom/FloatingInput";
import { toast } from "react-toastify";

export default function NewPasswordScreen() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const token = searchParams.get("token") || "";
    
    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing token.");
            navigate("/auth");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        const res = await Backend.resetPassword(token, password);
        if (res.ok) {
            toast.success("Password reset successfully. You can now log in with your new password.");
            navigate("/auth");
        } else {
            toast.error(`Failed to reset password: ${res.error}`);
        }
    };

    return (
        <Layout header="Reset Password">
            <div className="max-w-md mx-auto mt-10 p-6 bg-bg-secondary rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <FloatingInput
                            label="New Password"
                            type="password"
                            state={password}
                            setState={setPassword}
                        />
                    </div>
                    <div>
                        <FloatingInput
                            label="Confirm New Password"
                            type="password"
                            state={confirmPassword}
                            setState={setConfirmPassword}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-simon-blue text-white font-semibold rounded-md hover:bg-simon-blue-dark disabled:opacity-50"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </Layout>
    );
}

