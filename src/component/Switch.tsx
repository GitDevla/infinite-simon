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
		<div id={id}
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				perspective: "400px",
			}}
		>
			<div style={{
				width: "100%",
				height: "100%",
				backgroundColor: isOn ? "red" : "rgba(109, 1, 1, 1)",
				boxShadow: isOn ? "0 0 20px red" : "none",
				transform: isOn ? "rotateX(15deg)" : "rotateX(-15deg)",
				transition: "transform 0.5s",
				borderRadius: "10px",
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around",
				flexDirection: "column",
			}} onClick={() => handleToggleChange(!isOn) }>
				<span>I</span>
				<span>O</span>
			</div>
		</div>
	);
}
