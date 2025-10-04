import {useEffect, useState} from "react";

/**
 * A switch component that toggles between on and off states.
 * @param onToggle - A callback function that is called when the switch is toggled, receiving the new state as a boolean.
 * @param value - The current state of the switch. If provided, the component acts as a controlled component.
 * @param id - An optional id for the switch container.
 */
export default function Switch({
	onToggle,
	value,
	id,
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
		<div
			id={id}
			className="size-full flex justify-center items-center "
			style={{
				perspective: "400px",
				aspectRatio: "5/6",
				width: "90px",
			}}>
			<div
				className="simon-switch size-full flex flex-col transition-all rounded-sm  items-center justify-around"
				role="switch"
				aria-checked={isOn}
				tabIndex={0}
				onKeyDown={() => {}}
				onClick={() => handleToggleChange(!isOn)}
				data-ison={isOn}>
				<span>I</span>
				<span>O</span>
			</div>
		</div>
	);
}
