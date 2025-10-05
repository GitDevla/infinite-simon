import {createRef} from "react";
import AnimatedCursor from "../component/AnimatedCursor";
import ButtonQuarterRing, {type ButtonQuarterRingHandle} from "../component/ButtonQuarterRing";
import GameEndModal from "../component/GameEndModal";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";
import "../style/GameScreen.css";
import GameStatusBar from "../component/GameStatusBar";
import InputShelf from "../component/InputShelf";
import ScoreButton from "../component/ScoreButton";
import {useGameInputs} from "../hook/useGameInputs";
import {useGameLogic} from "../hook/useGameLogic";
import {useSequenceAnimation} from "../hook/useSequenceAnimation";

export type GameInput = {
	type: string;
	id: string;
	value?: number | boolean;
};

/**
 * The main game screen component that manages the game state, user interactions, and rendering of game inputs.
 * It handles the game logic, including starting a new game, processing user inputs, and reenacting the sequence of actions.
 * The component also displays the current score and manages the layout of various input components like buttons, sliders, switches, and knobs.
 */
export default function GameScreen() {
	const {score, gameOngoing, setGameOngoing, sequence, handleUserInput, moveSpeedInMs} = useGameLogic();

	const {forceUpdate, resetInputs, updateInput, enabledButtons, enabledSliders, enabledSwitches, enabledKnobs} =
		useGameInputs(sequence);

	const {pointerPosition, replaying, buttonRefs} = useSequenceAnimation(
		sequence,
		moveSpeedInMs,
		updateInput,
		resetInputs,
	);

	const rotations = [270, 0, 180, 90];

	return (
		<div className="layout">
			<div className="topbar text-center">
				<GameStatusBar replaying={replaying} />
			</div>
			<div className="center flex justify-center">
				<div className="grid relative grid-cols-[1fr_1fr] gap-10 aspect-square">
					{enabledButtons.map((input, index) => {
						let ref = buttonRefs.current[input.id];
						if (!ref) {
							ref = createRef<ButtonQuarterRingHandle>();
							buttonRefs.current[input.id] = ref;
						}
						return (
							<div key={input.id} style={{transform: `rotate(${rotations[index]}deg)`}}>
								<ButtonQuarterRing
									color={input.id.split("-")[1]}
									onPress={() => handleUserInput(input.id, true)}
									ref={ref}
									id={input.id}
								/>
							</div>
						);
					})}
					<ScoreButton value={score} />
				</div>
			</div>
			<div className="bottom-middle flex justify-center items-center">
				<button
					type="button"
					onClick={() => setGameOngoing(false)}
					className="give-up-button p-2 text-xl cursor-pointer">
					GIVE UP
				</button>
			</div>
			<InputShelf className="left w-full">
				{enabledSliders.map(input => (
					<Slider
						key={`${input.id}-${forceUpdate}`}
						max={5}
						value={typeof input.value === "number" ? input.value : 0}
						onChange={value => handleUserInput(input.id, value)}
						id={input.id}
					/>
				))}
			</InputShelf>

			<InputShelf className="bottom-left">
				{enabledSwitches.map(input => (
					<Switch
						key={`${input.id}-${forceUpdate}`}
						onToggle={state => handleUserInput(input.id, state)}
						value={typeof input.value === "boolean" ? input.value : false}
						id={input.id}
					/>
				))}
			</InputShelf>
			<InputShelf className="bottom-right">
				{enabledKnobs.map(input => (
					<Knob
						key={`${input.id}-${forceUpdate}`}
						max={8}
						onChange={value => handleUserInput(input.id, value)}
						value={typeof input.value === "number" ? input.value : 0}
						id={input.id}
					/>
				))}
			</InputShelf>
			{!gameOngoing && <GameEndModal score={score} />}
			<AnimatedCursor pos={pointerPosition} speed={moveSpeedInMs} />
		</div>
	);
}
