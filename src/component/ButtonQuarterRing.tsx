import { useEffect, useRef } from "react";

export default function ButtonQuarterRing({
	color,
	onPress,
	additionalStyles,
	triggerAnimation,
	id
}: {
	color?: string;
	onPress?: () => void;
	additionalStyles?: React.CSSProperties;
	triggerAnimation?: boolean;
	id?: string;
}) {
	const ref = useRef<SVGSVGElement>(null);

	function onClickAnimation() {
		if (!ref.current) return;
		ref.current.style.setProperty(
			"filter",
			`drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
		);
		setTimeout(() => {
			ref.current?.style.setProperty("filter", "none");
		}, 200);
	}

	useEffect(() => {
		if (triggerAnimation) {
			onClickAnimation();
		}
	}, [triggerAnimation]);

	return (
		<div
			style={{
				...additionalStyles,
			}}
			onClick={onPress}
			id={id}
		>
			<svg
				ref={ref}
				viewBox="-40 -65 95 95"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					cursor: "pointer",
					transition: "filter 0.5s ease",
				}}
				onMouseEnter={(e) => {
					ref.current?.style.setProperty(
						"filter",
						`drop-shadow(0 0 3px ${color}) drop-shadow(0 0 16px ${color})`,
					);
				}}
				onMouseLeave={(e) => {
					ref.current?.style.setProperty("filter", "none");
				}}
				onClick={onClickAnimation}
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
