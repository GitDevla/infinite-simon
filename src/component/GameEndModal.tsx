import { useState } from "react";
import SaveScore from "./SaveScore";

export default function GameEndModal({ score = 0 }: { score?: number }) {
	const [username, setUsername] = useState("");

	const validUsername = username.trim().length > 0;

	function updateUsernameAndSave() {
		SaveScore(username, score);
		alert(username + "! Your " + score + " was successfully saved!");
	}

	function handleKeyPress() {
		if (validUsername) {
			updateUsernameAndSave();
		}
		window.location.reload();
	}

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
				style={{
					backgroundColor: "white",
					zIndex: 1000,
				}}
			>
				<h2>You lost</h2>
				<p>Correct sequence was ...</p>
				<p>Enter your name to save your score ({score}) as the #1 player!</p>
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
					}}
					onClick={handleKeyPress}
				>
					{validUsername ? "Save and try again" : "Or give it one more try"}
				</button>
			</div>
		</>
	);
}
