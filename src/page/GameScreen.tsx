import { useState } from "react";
import Button from "../component/Button";
import GameEndModal from "../component/GameEndModal";
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
		<div>
			<div>
				<h1>Game Screen</h1>
				<span>Score: {score}</span>
			</div>
			<div>
				<div>
					{enabledButtons.map((input) => (
						<Button
							color={input.id.split("-")[1]}
							key={input.id}
							onPress={() => addAction(`${input.id}:pressed`)}
						/>
					))}
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
				<div>
					{enabledSwitches.map((input) => (
						<Switch
							key={input.id}
							onToggle={(state) => addAction(`${input.id}:${state}`)}
						/>
					))}
				</div>
				<div>
					{enabledKnobs.map((input) => (
						<Slider
							key={input.id}
							max={8}
							onChange={(value) => addAction(`${input.id}:${value}`)}
						/>
					))}
				</div>
			</div>
			<button type="button" onClick={() => setGameOngoing(false)}>
				End Game
			</button>
			<div>
				{/* Testing, remove in prod */}
				{JSON.stringify(actions)}
			</div>
			{!gameOngoing && <GameEndModal score={score} />}
		</div>
	);
}
