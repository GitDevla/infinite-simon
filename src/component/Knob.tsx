import clsx from "clsx";
import { useEffect, useState } from "react";
import { mod } from "../util/mod";

/**
 * A knob component that allows users to select a value within a specified range by rotating the knob.
 * @param min - The minimum value of the knob. Default is 0.
 * @param max - The maximum value of the knob (exclusive). Default is 5.
 * @param value - The current value of the knob. If provided, the component acts as a controlled component.
 * @param onChange - A callback function that is called when the value changes.
 * @param id - An optional id for the knob container.
 */
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

	const handleKeyboard = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowUp" || e.key === "ArrowRight") {
			setInnerValue((v) => {
				const newValue = clamp(v + 1);
				onChange?.(newValue);
				return newValue;
			});
			e.preventDefault();
		}
		if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
			setInnerValue((v) => {
				const newValue = clamp(v - 1);
				onChange?.(newValue);
				return newValue;
			});
			e.preventDefault();
		}
	};

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
		<div className="relative size-[100px]" id={id}>
			<div
				className="simon-knob absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center"
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max - 1}
				aria-valuenow={clamp(innerValue)}
				tabIndex={0}
				onMouseDown={handleMouseDown}
				onKeyDown={handleKeyboard}
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
						className={clsx(
							"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all flex text-sm origin-center",
							i === clamp(innerValue)
								? "font-bold text-red-600"
								: "font-normal text-[var(--fg)]",
						)}
						style={{
							transform: `translate(-50%, -50%) rotate(${(i / max) * 360}deg) translateY(-40px) rotate(-${(i / max) * 360}deg) scale(${i === clamp(innerValue) ? 1.2 : 1})`,
						}}
					>
						{i}
					</span>
				))}
			</div>
		</div>
	);
}
