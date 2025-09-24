import { useEffect, useState } from "react";
import { mod } from "../util/mod";

export default function Knob({
	min = 0,
	max = 5,
	value: externalValue,
	onChange,
	id
}: {
	min?: number;
	max?: number;
	onChange?: (value: number) => void;
	value?: number;
	id?: string;
}) {
	const [innerValue, setInnerValue] = useState(min);

	useEffect(() => {
		if (externalValue !== undefined) {
			setInnerValue(externalValue);
		}
	}, [externalValue]);

	const clamp = (v: number) => mod(Math.round(v), max);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();

		const startY = e.clientY;
		const startValue = innerValue;

		const onMouseMove = (moveEvent: MouseEvent) => {
			const deltaY = startY - moveEvent.clientY;
			const sensitivity = (max - min) / 100;
			const newValue = startValue + deltaY * sensitivity;
			setInnerValue(newValue);
		};
		const onMouseUp = () => {
			setInnerValue((v) => {
				v = Math.round(v);
				onChange?.(clamp(v));
				return v;
			});
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	return (
		<div style={{ position: "relative", width: "100px", height: "100px" }} id={id}>
			<div
				style={{
					position: "absolute",
					width: "50%",
					height: "50%",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					borderRadius: "25px",
					backgroundColor: "gray",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
				onMouseDown={handleMouseDown}
			>
				<div
					style={{
						position: "absolute",
						width: "4px",
						height: "20px",
						backgroundColor: "black",
						top: "5px",
						borderRadius: "2px",
						transform: `rotate(${((innerValue - min) / (max - min)) * 360}deg)`,
						transformOrigin: "bottom center",
						transition: "transform 0.2s ease-out",
					}}
				></div>
			</div>
			<div>
				{Array.from({ length: max }, (_, i) => (
					<span
						key={i}
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							width: "20px",
							height: "20px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							transform: `translate(-50%, -50%) rotate(${(i / max) * 360}deg) translateY(-40px) rotate(-${(i / max) * 360}deg)`,
							transformOrigin: "center center",
							color: i === clamp(innerValue) ? "red" : "black",
							fontSize: "14px",
						}}
					>
						{i}
					</span>
				))}
			</div>
		</div>
	);
}
