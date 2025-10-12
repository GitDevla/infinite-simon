import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import UserPill from "./UserPill";

export default function Header() {
	const authContext = useContext(AuthContext);
	const loggedIn = authContext.loggedIn;

	return (
		<header className="w-full p-4 grid grid-cols-2 absolute top-0 left-0">
			<div className="flex justify-start">
				{loggedIn && <UserPill />}
				{loggedIn ? (
					<button type="button" onClick={() => authContext.logout()}>
						Logout
					</button>
				) : (
					<button type="button" onClick={() => authContext.login("Guest", "")}>
						Login
					</button>
				)}
			</div>
			<div className="flex justify-end">
				<img src="https://placehold.co/50" alt="Settings" />
			</div>
		</header>
	);
}
