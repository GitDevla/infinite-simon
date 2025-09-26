import { useEffect, useState } from "react";

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
			className="size-full flex flex-center"
			style={{
				perspective: "400px",
			}}
		>
			<div
				className="simon-switch size-full flex flex-column transition-all rounded-sm flex-center content-around"
				onClick={() => handleToggleChange(!isOn)}
				data-ison={isOn}
			>
				<span>I</span>
				<span>O</span>
			</div>
		</div>
	);
}
