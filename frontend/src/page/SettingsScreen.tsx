import {useContext} from "react";
import GameSettingsForm from "../component/GameSettingsFrom";
import Layout from "../component/Layout/Layout";
import UserProfileForm from "../component/UserProfileForm";
import {AuthContext} from "../context/AuthContext";

export default function SettingsScreen() {
	const userContext = useContext(AuthContext);
	const loggedIn = userContext.loggedIn;
	return (
		<Layout header="Settings">
			<div className="max-w-[700px] mx-auto space-y-6">
				{loggedIn && <UserProfileForm />}
				<GameSettingsForm />
			</div>
		</Layout>
	);
}
