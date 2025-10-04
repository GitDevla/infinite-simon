import {forwardRef, useImperativeHandle, useRef} from "react";

/**
 * Handle for ButtonQuarterRing component
 */
export interface ButtonQuarterRingHandle {
	triggerAnimation: () => void;
}

/**
 * A button component that renders a quarter ring SVG and handles click animations for a Simon game.
 * @param color - The color of the button. It should correspond to a CSS variable (e.g., "red", "blue").
 * @param onPress - The function to call when the button is pressed.
 * @param additionalStyles - Additional CSS styles to apply to the button container.
 * @param id - An optional id for the button container.
 */
const ButtonQuarterRing = forwardRef<
	ButtonQuarterRingHandle,
	{
		color?: string;
		onPress?: () => void;
		additionalStyles?: React.CSSProperties;
		id?: string;
	}
>(({color, onPress, additionalStyles, id}, ref) => {
	const svgRef = useRef<SVGSVGElement>(null);

	function onClickAnimation() {
		if (!svgRef.current) return;
		svgRef.current.classList.add("animate");
		setTimeout(() => {
			svgRef.current?.classList.remove("animate");
		}, 200);
	}

	// Expose methods to parent components
	useImperativeHandle(ref, () => ({
		triggerAnimation: onClickAnimation,
	}));

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
			id={id}>
			<svg
				ref={svgRef}
				viewBox="-40 -65 95 95"
				xmlns="http://www.w3.org/2000/svg"
				className="simon-button"
				style={
					{
						"--button-color": `rgb(var(--simon-${color}))`,
					} as React.CSSProperties
				}
				onClick={onClickAnimation}
				onKeyDown={() => {}}>
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
});

ButtonQuarterRing.displayName = "ButtonQuarterRing";

export default ButtonQuarterRing;
