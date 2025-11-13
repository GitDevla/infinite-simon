import {useContext} from "react";
import Layout from "../component/Layout/Layout";
import UserGlobalStats from "../component/UserGlobalStats";
import UserScoresList from "../component/UserScoresList";
import {AuthContext} from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProfileScreen() {
	const authContext = useContext(AuthContext);

	const username = authContext.user?.username;
	const userAvatar = authContext.user?.avatar_uri;
	const verified = authContext.user?.email_verified;

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
							<p className="text-sm text-gray-400">Email not verified. <Link to="/verify" className="text-simon-blue underline">
								Click here to resend verification email.
							</Link></p>
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
