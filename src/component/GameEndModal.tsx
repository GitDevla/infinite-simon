import SaveScore from "./SaveScore";
import { useState } from "react";

export default function GameEndModal({ score = 0 }: { score?: number }) {
	function updateUsernameAndSave(){
		let unsafeName = document.getElementById('username') as HTMLInputElement | null;
		let name = unsafeName ? unsafeName.value : 'N/A';
		SaveScore(name,score)
		alert(name+"! Your "+ score+" was successfully saved!")
	}
	return (
		<>
			<div
				className="fixed top-0 left-0 size-full"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
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
				<input id="username"  className="p-2" type="text" placeholder="Your name"/>
				<button type="button" style={{marginLeft:"2%"}} onClick={updateUsernameAndSave} >Save score!</button>
				<button
					type="button"
					className="rounded-sm pointer"
					style={{
						marginTop: "10px",
						padding: "10px 20px",
						outline: "none",
						border: "none",
					}}
					onClick={() => {
						window.location.reload();
					}}
				>
					Or give it one more try
				</button>
			</div>
		</>
	);
}
