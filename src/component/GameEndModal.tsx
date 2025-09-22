export default function GameEndModal({ score = 0 }: { score?: number }) {
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
				<input type="text" placeholder="Your name" />
				<br />
				<button type="button">Or give it one more try</button>
			</div>
		</>
	);
}
