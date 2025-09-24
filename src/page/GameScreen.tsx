import { useEffect, useState } from "react";
import AnimatedCursor from "../component/AnimatedCursor";
import ButtonQuarterRing from "../component/ButtonQuarterRing";
import GameEndModal from "../component/GameEndModal";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";
import { MockGame } from "../service/MockGame";

export type GameInput = {
	type: "button" | "slider" | "switch" | "knob";
	id: string;
	enabled: boolean;
	value?: number | boolean;
};

export default function GameScreen() {
	const [actions, setActions] = useState<any[]>([]);
	const [pointerPosition, setPointerPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [inputs, setInputs] = useState<GameInput[]>([
		{ type: "button", id: "simon-red", enabled: true },
		{ type: "button", id: "simon-green", enabled: true },
		{ type: "button", id: "simon-blue", enabled: true },
		{ type: "button", id: "simon-yellow", enabled: true },
		{ type: "slider", id: "slider-1", enabled: true, value: 0 },
		{ type: "switch", id: "switch-1", enabled: true, value: false },
		{ type: "switch", id: "switch-2", enabled: true, value: false },
		{ type: "knob", id: "knob-1", enabled: true, value: 0 },
		{ type: "knob", id: "knob-2", enabled: true, value: 0 },
	]);

	const game = MockGame.getInstance();
	const [sequence, setSequence] = useState<any[]>(game.getSequence());
	const [currentHighlight, setCurrentHighlight] = useState<string>("");

	const highlightInput = async (id: string, value: any) => {
		const element = document.getElementById(id);
		if (element) {
			const rect = element.getBoundingClientRect();
			setPointerPosition({
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			});
		}
		await new Promise((res) => setTimeout(res, 500));
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

	const reenactSequence = async () => {
		document.body.style.pointerEvents = "none";
		for (let i = 0; i < sequence.length; i++) {
			const { id, value } = sequence[i];
			highlightInput(id, value);
			await new Promise((res) => setTimeout(res, 1000));
		}
		// reset to default state
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
		document.body.style.pointerEvents = "auto";
	};

	useEffect(() => {
		reenactSequence();
	}, []);

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

	const score = actions.length;
	const addAction = (action: string) => {
		setActions((prev) => [...prev, action]);
	};

	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: "auto 1fr auto",
				gridTemplateColumns: "1fr 5fr 1fr",
				gap: "20px",
				height: "100vh",
			}}
		>
			<div
				style={{
					gridColumn: "1 / -1",
					marginBottom: "20px",
					textAlign: "center",
				}}
			>
				<span style={{ fontSize: "3rem" }}>Score: {score}</span>
			</div>
			<div
				style={{
					display: "flex",
					gap: "10px",
					backgroundColor: "lightgrey",
					padding: "20%",
					borderRadius: "0 40px 40px 0",
					height: "70%",
					width: "100%",
					margin: "auto",
				}}
			>
				{enabledSliders.map((input) => (
					<Slider
						key={input.id}
						max={5}
						value={typeof input.value === "number" ? input.value : 0}
						onChange={(value) => addAction(`${input.id}:${value}`)}
						id={input.id}
					/>
				))}
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "40px",
						aspectRatio: "1/1",
					}}
				>
					<ButtonQuarterRing
						color="red"
						onPress={() => addAction(`simon-red:pressed`)}
						additionalStyles={{ transform: "rotate(270deg)" }}
						triggerAnimation={currentHighlight === "simon-red"}
						id="simon-red"
					/>
					<ButtonQuarterRing
						color="green"
						onPress={() => addAction(`simon-green:pressed`)}
						additionalStyles={{ transform: "rotate(0deg)" }}
						triggerAnimation={currentHighlight === "simon-green"}
						id="simon-green"
					/>
					<ButtonQuarterRing
						color="blue"
						onPress={() => addAction(`simon-blue:pressed`)}
						additionalStyles={{ transform: "rotate(180deg)" }}
						triggerAnimation={currentHighlight === "simon-blue"}
						id="simon-blue"
					/>
					<ButtonQuarterRing
						color="yellow"
						onPress={() => addAction(`simon-yellow:pressed`)}
						additionalStyles={{ transform: "rotate(90deg)" }}
						triggerAnimation={currentHighlight === "simon-yellow"}
						id="simon-yellow"
					/>
				</div>
			</div>
			<div></div>

			<div
				style={{
					display: "flex",
					gap: "10px",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "lightgrey",
					padding: "10px",
					borderRadius: "0 40px 0 0",
				}}
			>
				{enabledSwitches.map((input) => (
					<Switch
						key={input.id}
						onToggle={(state) => addAction(`${input.id}:${state}`)}
						value={typeof input.value === "boolean" ? input.value : false}
						id={input.id}
					/>
				))}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<button
					type="button"
					onClick={() => setGameOngoing(false)}
					style={{
						width: "25%",
						padding: "10px",
						fontSize: "1.5rem",
						border: "none",
						borderRadius: "4000px",
						cursor: "pointer",
					}}
				>
					GIVE UP
				</button>
			</div>
			<div
				style={{
					display: "flex",
					gap: "10px",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "lightgrey",
					padding: "10px",
					borderRadius: "40px 0 0 0",
				}}
			>
				{enabledKnobs.map((input) => (
					<Knob
						key={input.id}
						max={8}
						onChange={(value) => addAction(`${input.id}:${value}`)}
						value={typeof input.value === "number" ? input.value : 0}
						id={input.id}
					/>
				))}
			</div>
			{!gameOngoing && <GameEndModal score={score} />}
			<AnimatedCursor pos={pointerPosition} />
		</div>
	);
}
