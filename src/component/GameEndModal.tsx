import { useEffect, useState } from "react";
import SaveScore from "./SaveScore";
import { positionOnScoreboardIfInserted } from "../service/Score";

export default function GameEndModal({ score = 0 }: { score?: number }) {
	const [username, setUsername] = useState("");
	const [wouldBePosition, setWouldBePosition] = useState(1);

	const validUsername = username.trim().length > 0;

	function updateUsernameAndSave() {
		SaveScore(username, score);
		alert(`${username}! Your ${score} was successfully saved!`);
	}

	function handleKeyPress() {
		if (validUsername) {
			updateUsernameAndSave();
		}
		window.location.reload();
	}

	useEffect(() => {
		positionOnScoreboardIfInserted(score).then((pos) => setWouldBePosition(pos));
	}, [score]);

	return (
		<>
			<div
				className="fixed top-0 left-0 size-full"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					zIndex: 999,
				}}
			></div>
			<div
				className="fixed p-2 rounded-lg top-1/2 left-1/2 transform-center align-center"
				role="dialog"
				style={{
					backgroundColor: "var(--bg-2)",
					zIndex: 1000,
					pointerEvents: "auto",

				}}
			>
				<h2
					style={{
						marginBottom: "10px",
						fontSize: "3rem",
					}}
				>
					You lost
				</h2>
				<p
					style={{
						marginBottom: "10px",
					}}
				>
					Enter your name to save your score ({score}) as the #{wouldBePosition} player!
				</p>
				<input
					className="p-2"
					type="text"
					placeholder="Your name"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<button
					type="button"
					className="rounded-sm pointer"
					style={{
						marginTop: "10px",
						padding: "10px 20px",
						outline: "none",
						border: "none",
						backgroundColor: validUsername ? "var(--simon-green)" : "grey",
						color: validUsername ? "black" : "white",
						fontSize: "1.2rem",
						minWidth: "250px",
					}}
					onClick={handleKeyPress}
				>
					{validUsername ? "Save and try again" : "Or give it one more try"}
				</button>
				<br />
				<button
					type="button"
					className="rounded-sm pointer"
					style={{
						marginTop: "10px",
						padding: "10px 20px",
						outline: "none",
						border: "none",
						backgroundColor: validUsername ? "var(--simon-green)" : "var(--simon-red)",
						color: validUsername ? "black" : "white",
						fontSize: "1rem",
						minWidth: "200px",

					}}
				>
					{validUsername ? "Save and go back to home" : "Go back to home"}
				</button>
			</div>
		</>
	);
}
