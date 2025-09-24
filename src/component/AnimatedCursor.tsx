export default function AnimatedCursor({
	pos,
}: {
	pos: { x: number; y: number } | null;
}) {
	return pos ? (
		<div
			style={{
				position: "fixed",
				left: pos.x,
				top: pos.y,
				fontSize: "2rem",
				pointerEvents: "none",
				zIndex: 1000,
				transition: "left 300ms ease, top 300ms ease",
			}}
		>
			👆
		</div>
	) : null;
}
