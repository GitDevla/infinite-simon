import { useState } from "react";
import ButtonQuarterRing from "../component/ButtonQuarterRing";
import GameEndModal from "../component/GameEndModal";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";

export type GameInput = {
	type: "button" | "slider" | "switch" | "knob";
	id: string;
	enabled: boolean;
};

export default function GameScreen() {
	const [actions, setActions] = useState<any[]>([]);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [inputs, setInputs] = useState<GameInput[]>([
		{ type: "button", id: "simon-red", enabled: true },
		{ type: "button", id: "simon-green", enabled: true },
		{ type: "button", id: "simon-blue", enabled: true },
		{ type: "button", id: "simon-yellow", enabled: true },
		{ type: "slider", id: "slider-1", enabled: true },
		{ type: "switch", id: "switch-1", enabled: true },
		{ type: "switch", id: "switch-2", enabled: true },
		{ type: "knob", id: "knob-1", enabled: true },
		{ type: "knob", id: "knob-2", enabled: true },
	]);

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
				padding: "20px",
				height: "100vh",
				boxSizing: "border-box",
			}}
		>
			<div style={{ gridColumn: "1 / -1", marginBottom: "20px" }}>
				<h1>Game Screen</h1>
				<span>Score: {score}</span>
			</div>
			<div>
				{enabledSliders.map((input) => (
					<Slider
						key={input.id}
						max={5}
						onChange={(value) => addAction(`${input.id}:${value}`)}
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
					/>
					<ButtonQuarterRing
						color="green"
						onPress={() => addAction(`simon-red:pressed`)}
						additionalStyles={{ transform: "rotate(0deg)" }}
					/>
					<ButtonQuarterRing
						color="blue"
						onPress={() => addAction(`simon-red:pressed`)}
						additionalStyles={{ transform: "rotate(180deg)" }}
					/>
					<ButtonQuarterRing
						color="yellow"
						onPress={() => addAction(`simon-red:pressed`)}
						additionalStyles={{ transform: "rotate(90deg)" }}
					/>
				</div>
			</div>
			<div></div>

			<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
				{enabledSwitches.map((input) => (
					<Switch
						key={input.id}
						onToggle={(state) => addAction(`${input.id}:${state}`)}
					/>
				))}
			</div>
			<button type="button" onClick={() => setGameOngoing(false)}>
				End Game
			</button>
			<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
				{enabledKnobs.map((input) => (
					<Knob
						key={input.id}
						max={8}
						onChange={(value) => addAction(`${input.id}:${value}`)}
					/>
				))}
			</div>
			{!gameOngoing && <GameEndModal score={score} />}
		</div>
	);
}
