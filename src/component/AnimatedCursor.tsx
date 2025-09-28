/**
 * A simple animated cursor component that follows the mouse position.
 * It displays a pointing finger emoji at the given position with a smooth transition.
 * @param pos - The current position of the cursor. If null, the cursor is not displayed.
 * @param speed - The speed of the transition in milliseconds. Default is 300ms.
 */
export default function AnimatedCursor({
	pos,
	speed = 300,
}: {
	pos: { x: number; y: number } | null;
	speed?: number;
}) {
	return pos ? (
		<div
			style={{
				position: "fixed",
				left: pos.x,
				top: pos.y,
				fontSize: "2rem",
				pointerEvents: "none",
				zIndex: 500,
				transition: `left ${speed}ms ease, top ${speed}ms ease`,
			}}
		>
			👆
		</div>
	) : null;
}
