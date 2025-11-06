import {useContext} from "react";
import Layout from "../component/Layout/Layout";
import UserGlobalStats from "../component/UserGlobalStats";
import UserScoresList from "../component/UserScoresList";
import {AuthContext} from "../context/AuthContext";

export default function ProfileScreen() {
	const authContext = useContext(AuthContext);

	const username = authContext.user?.username;
	const userAvatar = authContext.user?.avatar_uri;

	return (
		<Layout header="Profile">
			<div className="max-w-[500px] mx-auto">
				<div className="flex flex-col items-center">
					<img src={userAvatar} alt="User Avatar" className="w-32 h-32 rounded-full mb-4" />
					<h3 className="text-xl font-medium">{username}</h3>
					<div className="mt-6 w-full">
						<UserGlobalStats />
					</div>
					<UserScoresList />
				</div>
			</div>
		</Layout>
	);
}
