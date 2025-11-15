import { useState } from "react";
import FloatingInput from "./Atom/FloatingInput";
import { Backend } from "../util/Backend";
import { toast } from "react-toastify";

export default function ForgotPasswordModal({modalClose}: {modalClose: () => void}) {
    const [email, setEmail] = useState<string>(""); 


    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await Backend.requestPasswordReset(email);
        if (res.ok) {
            toast.success("Password reset link sent to your email.");
            modalClose();
        } else {
            toast.error(`Failed to send reset link: ${res.error}`);
        }
    }


    return (
        <div>
            <div
				className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 z-40"
				onClick={modalClose}
				onKeyDown={modalClose}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary p-6 rounded-lg z-50 w-80 bg-bg-secondary">
                <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
                <form className="flex flex-col space-y-4" onSubmit={handlesubmit}>
                    <div>
                        <FloatingInput
                            label="Email"
                            setState={setEmail}
                            state={email}
                            type="email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2.5 bg-simon-blue text-white border-none rounded-lg">
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}