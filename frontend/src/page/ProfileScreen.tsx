import {useContext} from "react";
import Layout from "../component/Layout/Layout";
import UserGlobalStats from "../component/UserGlobalStats";
import UserScoresList from "../component/UserScoresList";
import {AuthContext} from "../context/AuthContext";
import { Backend } from "../util/Backend";
import { toast } from "react-toastify";

export default function ProfileScreen() {
	const authContext = useContext(AuthContext);

	const username = authContext.user?.username;
	const userAvatar = authContext.user?.avatar_uri;
	const verified = authContext.user?.email_verified;

	const requestEmailVerification = async () => {
		const res = await Backend.resendVerificationEmail();
		if (res.ok) {
			toast.info("Verification email sent. Please check your inbox.");
		} else {
			toast.error(`Failed to send verification email: ${res.error}`);
		}
	}

	return (
		<Layout header="Profile" goBack={true}>
			<div className="max-w-[500px] mx-auto">
				<div className="flex flex-col items-center">
					<img src={userAvatar} alt="User Avatar" className="w-32 h-32 rounded-full mb-4" />
					<h3 className="text-xl font-medium">{username}
						{verified && (
							<span title="Email Verified" className="ml-2 text-simon-green">
								&#10004;
							</span>
						)}
					</h3>
					{
						!verified && (
							<p className="text-sm text-gray-400">Email not verified. 
							<button type="button" className="text-simon-blue underline" onClick={requestEmailVerification}>
								Start verification process.
							</button>
							</p>
						)
					}
					<div className="mt-6 w-full">
						<UserGlobalStats />
					</div>
					<UserScoresList />
				</div>
			</div>
		</Layout>
	);
}
