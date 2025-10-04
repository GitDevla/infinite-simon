import { useEffect, useRef } from "react";

/**
 * A button component that renders a quarter ring SVG and handles click animations for a Simon game.
 * @param color - The color of the button. It should correspond to a CSS variable (e.g., "red", "blue").
 * @param onPress - The function to call when the button is pressed.
 * @param additionalStyles - Additional CSS styles to apply to the button container.
 * @param triggerAnimation - A boolean that, when changed to true, triggers the click animation.
 * @param id - An optional id for the button container.
 */
export default function ButtonQuarterRing({
	color,
	onPress,
	additionalStyles,
	triggerAnimation,
	id,
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
		ref.current.classList.add("animate");
		setTimeout(() => {
			ref.current?.classList.remove("animate");
		}, 200);
	}

	useEffect(() => {
		if (triggerAnimation) {
			onClickAnimation();
		}
	}, [triggerAnimation]);

	return (
		<button
			style={{
				...additionalStyles,
			}}
			type="button"
			aria-pressed="false"
			tabIndex={0}
			onKeyDown={() => {}}
			onClick={onPress}
			id={id}
		>
			<svg
				ref={ref}
				viewBox="-40 -65 95 95"
				xmlns="http://www.w3.org/2000/svg"
				className="simon-button"
				style={
					{
						"--button-color": `rgb(var(--simon-${color}))`,
					} as React.CSSProperties
				}
				onClick={onClickAnimation}
				onKeyDown={() => {}}
			>
				<title>Simon Button</title>
				<path
					d="
      M -40 -40
      A 70 70 0 0 1 30 32"
					fill="none"
					stroke={`rgb(var(--simon-${color}))`}
					strokeWidth="50"
				/>
			</svg>
		</button>
	);
}
