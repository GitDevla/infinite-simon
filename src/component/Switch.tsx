import { useEffect, useState } from "react";

export default function Switch({
	onToggle,
	value,
	id
}: {
	onToggle?: (isOn: boolean) => void;
	value?: boolean;
	id?: string;
}) {
	const [isOn, setIsOn] = useState(false);

	useEffect(() => {
		if (value !== undefined) {
			setIsOn(value);
		}
	}, [value]);

	function handleToggleChange(newState: boolean) {
		setIsOn(newState);
		onToggle?.(newState);
	}

	return (
		<div id={id}>
			<input
				type="checkbox"
				checked={isOn}
				onChange={() => handleToggleChange(!isOn)}
			/>
			{isOn ? "ON" : "OFF"}
		</div>
	);
}
