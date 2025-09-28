import Logo from "./Logo";

/**
 * A score button component that displays the current round number in the center of a circular button.
 * It also includes the Logo component above the round number.
 * @param value - The current round number to display.
 */
export default function ScoreButton({ value }: { value: number }) {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: "160px",
				height: "160px",
				borderRadius: "50%",
				backgroundColor: "var(--bg-2)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: "0 0 10px rgba(0,0,0,0.5)",
				userSelect: "none",
			}}
		>
			<Logo />
			<span>Round: {value}</span>
		</div>
	);
}
