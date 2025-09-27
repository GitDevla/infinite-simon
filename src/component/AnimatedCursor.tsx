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
