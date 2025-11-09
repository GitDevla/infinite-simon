import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {GameMode, type GameType} from "../../service/Game";
import SimpleLobbyModal from "../Game/SimpleLobbyModal";

export default function NavCard({
	lvlId,
	title,
	description,
	imageUrl,
}: {
	lvlId: GameType;
	title: string;
	description: string;
	imageUrl: string;
}) {
	const authContext = useContext(AuthContext);
	const loggedIn = authContext.loggedIn;

	const [showModal, setShowModal] = useState(false);

	return (
		<div className="bg-bg-secondary bg-opacity-70 rounded-xl w-80 aspect-[4/5]">
			<div>
				{imageUrl && (
					<img
						src={imageUrl}
						alt={title}
						className="w-full object-cover mb-2 rounded-lg aspect-[4/3] opacity-70"
					/>
				)}
			</div>
			<div className="mt-2 pb-4">
				<div>
					<h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
					<p className="text-center text-fg-secondary">{description}</p>
				</div>
				<div className="flex justify-center flex-col items-center">
					<Link
						to={`/game?difficulty=${lvlId}&mode=${GameMode.SinglePlayer}`}
						className="mt-4 inline-block bg-blue-500 text-white  px-4 py-2 rounded hover:bg-blue-600 w-[80%] text-center">
						Play Alone
					</Link>
					{loggedIn && (
						<button
							type="button"
							onClick={() => setShowModal(true)}
							className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-[80%] text-center">
							Play with Friends
						</button>
					)}
				</div>
			</div>
			{showModal && <SimpleLobbyModal lvlId={lvlId} modalClose={() => setShowModal(false)} />}
		</div>
	);
}
