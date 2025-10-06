import UserPill from "./UserPill";

export default function Header() {
	return (
		<header className="w-full p-4 grid grid-cols-2 absolute top-0 left-0">
			<div className="flex justify-start">
				<UserPill />
			</div>
			<div className="flex justify-end">
				<img src="https://placehold.co/50" alt="Settings" />
			</div>
		</header>
	);
}
