import Logo from "../Atom/Logo";

/**
 * A score button component that displays the current round number in the center of a circular button.
 * It also includes the Logo component above the round number.
 * @param value - The current round number to display.
 */
export default function ScoreButton({value}: {value: number}) {
	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[--bg-2] flex flex-col items-center justify-center shadow-lg shadow-black/50 select-none">
			<Logo />
			<span>Round: {value}</span>
		</div>
	);
}
