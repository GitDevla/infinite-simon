import { useEffect, useState } from "react";
import AnimatedCursor from "../component/AnimatedCursor";
import ButtonQuarterRing from "../component/ButtonQuarterRing";
import GameEndModal from "../component/GameEndModal";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";
import { MockGame } from "../service/MockGame";
import sleep from "../util/sleep";
import "../style/GameScreen.css";

export type GameInput = {
	type: "button" | "slider" | "switch" | "knob";
	id: string;
	enabled: boolean;
	value?: number | boolean;
};

export default function GameScreen() {
	const [pointerPosition, setPointerPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [score, setScore] = useState(0);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [inputs, setInputs] = useState<GameInput[]>([
		{ type: "button", id: "simon-red", enabled: true },
		{ type: "button", id: "simon-green", enabled: true },
		{ type: "button", id: "simon-blue", enabled: true },
		{ type: "button", id: "simon-yellow", enabled: true },
		{ type: "slider", id: "slider-1", enabled: false, value: 0 },
		{ type: "switch", id: "switch-1", enabled: false, value: false },
		{ type: "switch", id: "switch-2", enabled: false, value: false },
		{ type: "knob", id: "knob-1", enabled: false, value: 0 },
		{ type: "knob", id: "knob-2", enabled: false, value: 0 },
	]);

	const [forceUpdate, setForceUpdate] = useState(0);
	const game = MockGame.getInstance();
	const [sequence, setSequence] = useState<any[]>(game.getSequence());
	const [currentHighlight, setCurrentHighlight] = useState<string>("");
	const moveSpeedInMs = Math.max(700 - score * 20, 400);
	const [replaying, setReplaying] = useState(false);

	const handleUserInput = (id: string, value: any) => {
		const actionString = value !== undefined ? `${id}:${value}` : id;
		if (!game.validateUserAction(actionString)) setGameOngoing(false);

		if (game.isEndOfSequence()) {
			game.nextRound();
			setScore((s) => s + 1);
			setSequence(game.getSequence());
		}
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
		if (value !== undefined) {
			setInputs((prev) =>
				prev.map((input) =>
					input.id === id ? { ...input, value: value } : input,
				),
			);
		} else {
			setCurrentHighlight(id);
		}
	};

	const resetScene = () => {
		setCurrentHighlight("");
		setInputs((prev) =>
			prev.map((input) => {
				if (input.type === "switch") return { ...input, value: false };
				if (input.type === "knob") return { ...input, value: 0 };
				if (input.type === "slider") return { ...input, value: 0 };
				return input;
			}),
		);
		setPointerPosition(null);
		setForceUpdate((f) => f + 1);
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
		for (let i = 0; i < sequence.length; i++) {
			const { id, value } = sequence[i];
			await moveCursorToComponent(id);
			await highlightInput(id, value);
			await sleep(moveSpeedInMs);
		}
		await sleep(1000);
		resetScene();
		setPointerPosition(null);
		enableUserInteraction(true);
	};

	useEffect(() => {
		setInputs((prev) => {
			const ids = sequence.map((s) => s.id);
			return prev.map((input) => {
				if (input.type === "button") return input; // Keep buttons always enabled
				return { ...input, enabled: ids.includes(input.id) };
			});
		});
		reenactSequence();
	}, [sequence]);

	const enabledButtons = inputs.filter(
		(input) => input.type === "button" && input.enabled,
	);
	const enabledSliders = inputs.filter(
		(input) => input.type === "slider" && input.enabled,
	);
	const enabledSwitches = inputs.filter(
		(input) => input.type === "switch" && input.enabled,
	);
	const enabledKnobs = inputs.filter(
		(input) => input.type === "knob" && input.enabled,
	);

	const rotations = [270, 0, 180, 90];

	return (
		<div className="layout">
			<div className="topbar align-center">
				<span style={{ fontSize: "3rem" }}>Score: {score}</span>
				{replaying ? (
					<p>Wait for sequence to end</p>
				) : (
					<p>Now it's your turn</p>
				)}
			</div>
			<div className="center flex content-center">
				<div
					className="grid"
					style={{
						gridTemplateColumns: "1fr 1fr",
						gap: "40px",
						aspectRatio: "1/1",
					}}
				>
					{enabledButtons.map((input, index) => (
						<ButtonQuarterRing
							key={input.id}
							color={input.id.split("-")[1]}
							onPress={() => handleUserInput(input.id, true)}
							additionalStyles={{ transform: `rotate(${rotations[index]}deg)` }}
							triggerAnimation={currentHighlight === input.id}
							id={input.id}
						/>
					))}
				</div>
			</div>
			<div className="bottom-middle flex flex-center">
				<button
					type="button"
					onClick={() => setGameOngoing(false)}
					className="p-2 text-xl pointer"
					style={{
						border: "none",
						borderRadius: "4000px",
					}}
				>
					GIVE UP
				</button>
			</div>
			<div
				className="left flex w-full p-2 gap-2"
				style={{
					backgroundColor: "lightgrey",
					height: "100%",
				}}
			>
				{enabledSliders.map((input) => (
					<Slider
						key={`${input.id}-${forceUpdate}`}
						max={5}
						value={typeof input.value === "number" ? input.value : 0}
						onChange={(value) => handleUserInput(input.id, value)}
						id={input.id}
					/>
				))}
			</div>

			<div
				className="bottom-left flex gap-2 flex-center p-2"
				style={{
					backgroundColor: "lightgrey",
				}}
			>
				{enabledSwitches.map((input) => (
					<Switch
						key={`${input.id}-${forceUpdate}`}
						onToggle={(state) => handleUserInput(input.id, state)}
						value={typeof input.value === "boolean" ? input.value : false}
						id={input.id}
					/>
				))}
			</div>
			<div
				className="bottom-right flex gap-2 flex-center p-2"
				style={{
					backgroundColor: "lightgrey",
				}}
			>
				{enabledKnobs.map((input) => (
					<Knob
						key={`${input.id}-${forceUpdate}`}
						max={8}
						onChange={(value) => handleUserInput(input.id, value)}
						value={typeof input.value === "number" ? input.value : 0}
						id={input.id}
					/>
				))}
			</div>
			{!gameOngoing && <GameEndModal score={score} />}
			<AnimatedCursor pos={pointerPosition} speed={moveSpeedInMs} />
		</div>
	);
}
