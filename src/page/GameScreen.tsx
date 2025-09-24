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
					/>
				))}
			</div>
			{!gameOngoing && <GameEndModal score={score} />}
		</div>
	);
}
