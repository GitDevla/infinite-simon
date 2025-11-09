import { builtinModules } from "module";
import {forwardRef, useImperativeHandle, useRef} from "react";
import useSound from "use-sound";



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
		id?: string;
	}
>(({color, onPress, id}, ref) => {
	let playBackSpeed=1.0;

	const [buttonSound] = useSound(`${process.env.PUBLIC_URL}/button.mp3` , {playbackRate: playBackSpeed});
	const svgRef = useRef<SVGSVGElement>(null);

	function onClickAnimation() {

		switch (color){
			case "red":
				playBackSpeed = 0.8
				break;
			case "green":
				playBackSpeed = 1.0
				break;
			case "blue":
				playBackSpeed = 1.2
				break;
			case "yellow":
				playBackSpeed = 1.4
				break;
			default:
				playBackSpeed=1.0
		}

		if (!svgRef.current) return;
		svgRef.current.classList.add("animate");
		buttonSound({playbackRate: playBackSpeed});
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
			className="size-full"
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
