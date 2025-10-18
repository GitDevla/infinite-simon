import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as SettingsSvgIcon} from "../asset/settings.svg";
import {AuthContext} from "../context/AuthContext";
import UserPill from "./UserPill";

export default function Header() {
	const authContext = useContext(AuthContext);
	const loggedIn = authContext.loggedIn;

	const navigator = useNavigate();

	return (
		<header className="w-full p-4 grid grid-cols-2 absolute top-0 left-0">
			<div className="flex justify-start">
				{loggedIn && <UserPill />}
				{!loggedIn && (
					<button
						type="button"
						onClick={() => navigator("/auth")}
						className="bg-simon-blue text-white px-4 py-2 rounded-lg border-none">
						Login / Register
					</button>
				)}
			</div>
			<div className="flex justify-end">
				<Link to="/settings" title="Settings">
					<SettingsSvgIcon className="w-8 h-8 !aspect-square hover:rotate-180 transition-transform" />
				</Link>
			</div>
		</header>
	);
}
