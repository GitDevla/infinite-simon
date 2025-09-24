export default function ButtonQuarterRing({
	color,
	onPress,
	additionalStyles,
}: {
	color?: string;
	onPress?: () => void;
	additionalStyles?: React.CSSProperties;
}) {
	return (
		<div
			style={{
				...additionalStyles,
			}}
			onClick={onPress}
		>
			<svg
				viewBox="-40 -65 95 95"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					cursor: "pointer",
					transition: "filter 0.3s ease",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.filter = `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 16px ${color})`;
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.filter = "none";
				}}
			>
				<path
					d="
      M -40 -40
      A 70 70 0 0 1 30 32"
					fill="none"
					stroke={color}
					strokeWidth="50"
				/>
			</svg>
		</div>
	);
}
