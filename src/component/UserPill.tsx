import {Link} from "react-router-dom";

export default function UserPill() {
	const userContext = null; // todo
	const displayName = "Guest";
	const userImg = "https://placehold.co/400";
	return (
		<Link to="/profile">
			<div className="flex items-center gap-3 hover:cursor-pointer">
				<img src={userImg} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
				<span className="text-white font-semibold underline">{displayName}</span>
			</div>
		</Link>
	);
}
