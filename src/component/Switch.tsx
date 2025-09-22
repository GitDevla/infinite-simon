import { useEffect, useState } from "react";

export default function Switch({
	onToggle,
}: {
	onToggle?: (isOn: boolean) => void;
}) {
	const [isOn, setIsOn] = useState(false);

	function handleToggleChange(newState: boolean) {
		setIsOn(newState);
		onToggle?.(newState);
	}

	return (
		<div>
			<input
				type="checkbox"
				checked={isOn}
				onChange={() => handleToggleChange(!isOn)}
			/>
			{isOn ? "ON" : "OFF"}
		</div>
	);
}
