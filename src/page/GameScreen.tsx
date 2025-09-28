import { useEffect, useRef, useState } from "react";
import AnimatedCursor from "../component/AnimatedCursor";
import ButtonQuarterRing from "../component/ButtonQuarterRing";
import GameEndModal from "../component/GameEndModal";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";
import sleep from "../util/sleep";
import "../style/GameScreen.css";
import ScoreButton from "../component/ScoreButton";
import { Game } from "../service/Game";
import { ReactPart } from "../service/Parts";
import type { Sequence } from "../service/Sequence";

export type GameInput = {
	type: string;
	id: string;
	value?: number | boolean;
};

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
	const [currentHighlight, setCurrentHighlight] = useState<string>("");
	const moveSpeedInMs = Math.max(700 - score * 20, 400);
	const [replaying, setReplaying] = useState(false);

	useEffect(() => {
		game.current = new Game();
		game.current.startNewGame();
		game.current.onNewRound(() => {
			setScore(game.current!.getCurrentRound() - 1);
			setSequence(game.current!.getSequence());
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
		setCurrentHighlight("");
		if (value !== undefined && value !== null) {
			setInputs((prev) =>
				prev.map((input) =>
					input.id === id ? { ...input, value: value } : input,
				),
			);
		} else {
			requestAnimationFrame(() => requestAnimationFrame(()=>setCurrentHighlight(id))); // Force a re-render if the same button is highlighted twice in a row, double rAF hack for firefox
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
		if (!sequence) return;
		for (let i = 0; i < sequence.getParts().length; i++) {
			const { id, expectedValue } = sequence.getParts()[i];
			await moveCursorToComponent(id);
			await highlightInput(id, expectedValue);
			await sleep(moveSpeedInMs);
		}
		await sleep(1000);
		resetScene();
		setPointerPosition(null);
		enableUserInteraction(true);
	};

	useEffect(() => {
		setInputs((prev) => {
			if (!sequence) return prev;
			// Always have the 4 default buttons
			const defaults = [
				{ type: "button", id: "simon-red" },
				{ type: "button", id: "simon-green" },
				{ type: "button", id: "simon-blue" },
				{ type: "button", id: "simon-yellow" },
			] as GameInput[];
			for (const input of sequence.getParts()) {
				if (!defaults.find((d) => d.id === input.id))
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

	const enabledButtons = inputs.filter((input) => input.type === "button");
	const enabledSliders = inputs.filter((input) => input.type === "slider");
	const enabledSwitches = inputs.filter((input) => input.type === "switch");
	const enabledKnobs = inputs.filter((input) => input.type === "knob");

	const rotations = [270, 0, 180, 90];

	return (
		<div className="layout">
			<div className="topbar align-center">
				<div
					className="status-pill"
					style={{
						backgroundColor: replaying
							? "rgba(255, 130, 47, 0.8)"
							: "rgba(0, 255, 0, 0.7)",
					}}
				>
					<div
						className="status-indicator"
						style={{
							backgroundColor: replaying ? "red" : "green",
						}}
					></div>
					{replaying ? (
						<p>Wait for sequence to end</p>
					) : (
						<p>Now it's your turn</p>
					)}
				</div>
			</div>
			<div className="center flex content-center">
				<div
					className="grid"
					style={{
						position: "relative",
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
					<ScoreButton value={score} />
				</div>
			</div>
			<div className="bottom-middle flex flex-center">
				<button
					type="button"
					onClick={() => setGameOngoing(false)}
					className="give-up-button p-2 text-xl pointer"
				>
					GIVE UP
				</button>
			</div>
			<div
				className="left"
				style={{
					height: "100%",
					maxWidth: enabledSliders.length > 0 ? enabledSliders.length * 200 : 0,
				}}
			>
				<div className="p-2  flex w-full gap-2 h-full flex-center">
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
			</div>

			<div
				className="bottom-left"
				style={{
					height: "100%",
					maxWidth:
						enabledSwitches.length > 0 ? enabledSwitches.length * 200 : 0,
				}}
			>
				<div className="p-2 flex gap-2 flex-center">
					{enabledSwitches.map((input) => (
						<Switch
							key={`${input.id}-${forceUpdate}`}
							onToggle={(state) => handleUserInput(input.id, state)}
							value={typeof input.value === "boolean" ? input.value : false}
							id={input.id}
						/>
					))}
				</div>
			</div>
			<div className="bottom-right">
				<div
					style={{
						height: "100%",
						maxWidth: enabledKnobs.length > 0 ? enabledKnobs.length * 200 : 0,
					}}
				>
					<div className="flex gap-2 flex-center p-2">
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
				</div>
			</div>
			{!gameOngoing && <GameEndModal score={score} />}
			<AnimatedCursor pos={pointerPosition} speed={moveSpeedInMs} />
		</div>
	);
}
