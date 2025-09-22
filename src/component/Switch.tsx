import { useState } from "react";

export default function Switch() {
	const [isOn, setIsOn] = useState(false);
	return (
		<div>
			<input type="checkbox" checked={isOn} onChange={() => setIsOn(!isOn)} />
			{isOn ? "ON" : "OFF"}
		</div>
	);
}
