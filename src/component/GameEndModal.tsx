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
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				}}
			></div>
			<div
				style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					backgroundColor: "white",
					zIndex: 1000,
				}}
			>
				<h2>You lost</h2>
				<p>Correct sequence was ...</p>
				<p>Enter your name to save your score ({score}) as the #1 player!</p>
				<input id="username" type="text" placeholder="Your name"/>
				
				<button type="button" style={{marginLeft:"2%"}} onClick={updateUsernameAndSave} >Save score!</button>
				<br />
				<button type="button">Or give it one more try</button>
			</div>
		</>
	);
}
