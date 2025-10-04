import {createRef, useEffect, useRef, useState} from "react";
import AnimatedCursor from "../component/AnimatedCursor";
import ButtonQuarterRing, {type ButtonQuarterRingHandle} from "../component/ButtonQuarterRing";
import GameEndModal from "../component/GameEndModal";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";
import sleep from "../util/sleep";
import "../style/GameScreen.css";
import clsx from "clsx";
import InputShelf from "../component/InputShelf";
import ScoreButton from "../component/ScoreButton";
import {Game} from "../service/Game";
import {ReactPart} from "../service/Parts";
import type {Sequence} from "../service/Sequence";

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
	const [pointerPosition, setPointerPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [score, setScore] = useState(0);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [inputs, setInputs] = useState<GameInput[]>([]);

	const [forceUpdate, setForceUpdate] = useState(0);
	const game = useRef<Game | null>(null);
	const [sequence, setSequence] = useState<Sequence | null>(null);
	const moveSpeedInMs = Math.max(700 - score * 20, 400);
	const [replaying, setReplaying] = useState(false);
	const buttonRefs = useRef<any>({});

	useEffect(() => {
		game.current = new Game();
		game.current.startNewGame();
		game.current.onNewRound(() => {
			if (game.current === null) return;
			setScore(game.current.getCurrentRound() - 1);
			setSequence(game.current.getSequence());
		});
		setSequence(game.current.getSequence());
	}, []);

	const handleUserInput = (id: string, value: any) => {
		if (game.current === null) return;
		const action = new ReactPart(id, value);
		if (!game.current.checkPlayerInput(action)) setGameOngoing(false);
	};

	const moveCursorToComponent = async (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const rect = element.getBoundingClientRect();
			setPointerPosition({
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			});
		}
		await sleep(moveSpeedInMs);
	};

	const highlightInput = async (id: string, value: any) => {
		if (value !== undefined && value !== null) {
			setInputs(prev => prev.map(input => (input.id === id ? {...input, value: value} : input)));
		} else {
			const ref = buttonRefs.current[id];
			if (ref?.current) {
				ref.current.triggerAnimation();
			}
		}
	};

	const resetScene = () => {
		setInputs(prev =>
			prev.map(input => {
				if (input.type === "switch") return {...input, value: false};
				if (input.type === "knob") return {...input, value: 0};
				if (input.type === "slider") return {...input, value: 0};
				return input;
			}),
		);
		setPointerPosition(null);
		setForceUpdate(f => f + 1);
	};

	const enableUserInteraction = (value: boolean) => {
		document.body.style.pointerEvents = value ? "auto" : "none";
		setReplaying(!value);
	};

	const reenactSequence = async () => {
		enableUserInteraction(false);
		await sleep(moveSpeedInMs);
		resetScene();
		setPointerPosition({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		});
		await sleep(moveSpeedInMs);
		if (!sequence) return;
		for (let i = 0; i < sequence.getParts().length; i++) {
			const {id, expectedValue} = sequence.getParts()[i];
			await moveCursorToComponent(id);
			await highlightInput(id, expectedValue);
			await sleep(moveSpeedInMs);
		}
		await sleep(1000);
		resetScene();
		setPointerPosition(null);
		enableUserInteraction(true);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only want to run this when sequence changes
	useEffect(() => {
		setInputs(prev => {
			if (!sequence) return prev;
			// Always have the 4 default buttons
			const defaults = [
				{type: "button", id: "simon-red"},
				{type: "button", id: "simon-green"},
				{type: "button", id: "simon-blue"},
				{type: "button", id: "simon-yellow"},
			] as GameInput[];
			for (const input of sequence.getParts()) {
				if (!defaults.find(d => d.id === input.id))
					defaults.push({
						type: input.type,
						id: input.id,
						value: 0,
					});
			}
			return defaults;
		});

		reenactSequence();
	}, [sequence]);

	const enabledButtons = inputs.filter(input => input.type === "button");
	const enabledSliders = inputs.filter(input => input.type === "slider");
	const enabledSwitches = inputs.filter(input => input.type === "switch");
	const enabledKnobs = inputs.filter(input => input.type === "knob");

	const rotations = [270, 0, 180, 90];

	return (
		<div className="layout">
			<div className="topbar text-center">
				<div className={clsx("status-pill bg-opacity-75", replaying ? "bg-orange-500" : "bg-green-500")}>
					<div className={clsx("status-indicator", replaying ? "bg-red-600" : "bg-green-700")}></div>
					{replaying ? <p>Wait for sequence to end</p> : <p>Now it's your turn</p>}
				</div>
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
