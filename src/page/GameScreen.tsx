import { useState } from "react";
import Button from "../component/Button";
import GameEndModal from "../component/GameEndModal";
import Slider from "../component/Slider";
import Switch from "../component/Switch";

export default function GameScreen() {
	const [actions, setActions] = useState<any[]>([]);
	const [gameOngoing, setGameOngoing] = useState(true);
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
					<Button color="green" onPress={() => addAction("simon:green")} />
					<Button color="red" onPress={() => addAction("simon:red")} />
					<Button color="blue" onPress={() => addAction("simon:blue")} />
					<Button color="yellow" onPress={() => addAction("simon:yellow")} />
				</div>
				<div>
					<Slider onChange={(value) => addAction(`slider-1:${value}`)} />
				</div>
				<div>
					<Switch onToggle={(isOn) => addAction(`switch-1:${isOn}`)} />
					<Switch onToggle={(isOn) => addAction(`switch-2:${isOn}`)} />
				</div>
				<div>
					{/* Placeholder for knobs */}
					<Slider max={8} onChange={(value) => addAction(`knob-1:${value}`)} />
					<Slider max={8} onChange={(value) => addAction(`knob-2:${value}`)} />
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
