import Button from "../component/Button";
import Slider from "../component/Slider";
import Switch from "../component/Switch";

export default function GameScreen() {
	return (
		<div>
			<div>
				<h1>Game Screen</h1>
				<span>Score: 0</span>
			</div>

			<div>
				<div>
					<Button color="green" />
					<Button color="red" />
					<Button color="blue" />
					<Button color="yellow" />
				</div>
				<div>
					<Slider />
				</div>
				<div>
					<Switch />
					<Switch />
				</div>
				<div>
					{/* Placeholder for knobs */}
					<Slider max={8} />
					<Slider max={8} />
				</div>
			</div>
		</div>
	);
}
