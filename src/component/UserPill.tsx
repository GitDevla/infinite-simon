import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export default function UserPill() {
	const userContext = useContext(AuthContext);
	const displayName = userContext.username || "Uh oh";
	const userImg = userContext.useravatar || "https://placehold.co/100";
	return (
		<Link to="/profile">
			<div className="flex items-center gap-3 hover:cursor-pointer">
				<img src={userImg} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
				<span className="text-white font-semibold underline">{displayName}</span>
			</div>
		</Link>
	);
}
