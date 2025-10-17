import clsx from "clsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {positionOnScoreboardIfInserted, saveScore} from "../../service/ScoreLocal";

/**
 * A modal component that appears at the end of the game, allowing the player to enter their name and save their score.
 * @param score - The player's score to be saved. Default is 0.
 */
export default function GameEndModal({score = 0}: {score?: number}) {
	const [username, setUsername] = useState("");
	const [wouldBePosition, setWouldBePosition] = useState(1);
	const navigate = useNavigate();

	const validUsername = username.trim().length > 0;

	function updateUsernameAndSave() {
		saveScore(username, score);
		alert(`${username}! Your ${score} was successfully saved!`);
	}

	function handleKeyPress() {
		if (validUsername) {
			updateUsernameAndSave();
		}
		window.location.reload();
	}

	useEffect(() => {
		positionOnScoreboardIfInserted(score).then(pos => setWouldBePosition(pos));
	}, [score]);

	return (
		<>
			<div className="fixed top-0 left-0 size-full bg-black bg-opacity-50 z-[999]"></div>
			<div
				className="fixed p-2 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[1000] pointer-events-auto bg-[--bg-2]"
				role="dialog">
				<h2 className="mb-4 text-5xl">You lost</h2>
				<p className="mb-4">
					Enter your name to save your score ({score}) as the #{wouldBePosition} player!
				</p>
				<input
					className="p-2"
					type="text"
					placeholder="Your name"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<br />
				<button
					type="button"
					className={clsx(
						"rounded-xl cursor-pointer mt-4 px-4 py-3 text-xl min-w-[250px]",
						validUsername ? "bg-simon-green text-black" : "bg-gray-600 text-white",
					)}
					onClick={handleKeyPress}>
					{validUsername ? "Save and try again" : "Or give it one more try"}
				</button>
				<br />
				<button
					type="button"
					className={clsx(
						"rounded-xl cursor-pointer mt-4 px-4 py-3 text-lg min-w-[200px]",
						validUsername ? "bg-simon-green text-black" : "bg-simon-red text-white",
					)}
					onClick={() => {
						if (validUsername) updateUsernameAndSave();
						navigate("/");
					}}>
					{validUsername ? "Save and go back to home" : "Go back to home"}
				</button>
			</div>
		</>
	);
}
