import { useEffect, useState } from "react";
import { mod } from "../util/mod";

export default function Knob({
	min = 0,
	max = 5,
	value: externalValue,
	onChange,
	id,
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
		<div
			className="relative"
			style={{ width: "100px", height: "100px" }}
			id={id}
		>
			<div
				className="simon-knob absolute left-1/2 top-1/2 size-1/2 transform-center rounded-full flex flex-center"
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max - 1}
				aria-valuenow={clamp(innerValue)}
				tabIndex={0}
				onMouseDown={handleMouseDown}
			>
				<div
					className="simon-knob-inner absolute rounded-sm"
					style={{
						transform: `rotate(${((innerValue - min) / (max - min)) * 360}deg)`,
					}}
				></div>
			</div>
			<div>
				{Array.from({ length: max }, (_, i) => (
					<span
						key={i}
						className="absolute top-1/2 left-1/2 transform-center transition-all flex text-sm"
						style={{
							transform: `translate(-50%, -50%) rotate(${(i / max) * 360}deg) translateY(-40px) rotate(-${(i / max) * 360}deg) scale(${i === clamp(innerValue) ? 1.2 : 1})`,
							transformOrigin: "center center",
							color: i === clamp(innerValue) ? "red" : "var(--fg)",
						}}
					>
						{i}
					</span>
				))}
			</div>
		</div>
	);
}
