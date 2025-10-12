import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export default function UserPill() {
	const userContext = useContext(AuthContext);
	const displayName = userContext.username || "Uh oh";
	const userImg = userContext.useravatar || "https://placehold.co/100";
	const logout = userContext.logout;
	return (
		<div className="flex items-center gap-3 hover:cursor-pointer group relative">
			<img src={userImg} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
			<span className="text-white font-semibold underline">{displayName}</span>
			<nav className="absolute top-full left-0 mt-2 bg-bg-secondary text-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 w-32 items-center">
				<div className="flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
						<title>User Profile</title>
						<path
							fillRule="evenodd"
							d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clipRule="evenodd"
						/>
					</svg>
					<Link to="/profile" className="hover:underline">
						Profile
					</Link>
				</div>
				<div className="flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
						<title>Logout</title>
						<path
							fillRule="evenodd"
							d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
							clipRule="evenodd"
						/>
					</svg>
					<button type="button" onClick={() => logout()} className="hover:underline">
						Logout
					</button>
				</div>
			</nav>
		</div>
	);
}
