import type React from "react";
import { useEffect, useRef, useState } from "react";

/**
 * A vertical slider component that allows users to select a value within a specified range by dragging a ball along a track.
 * @param min - The minimum value of the slider. Default is 0.
 * @param max - The maximum value of the slider (exclusive). Default is 5.
 * @param value - The current value of the slider. If provided, the component acts as a controlled component.
 * @param onChange - A callback function that is called when the value changes.
 * @param id - An optional id for the slider container.
 */
export default function Slider({
	min = 0,
	max = 5,
	value: externalValue,
	onChange,
	id,
}: {
	min?: number;
	max?: number;
	value?: number;
	onChange?: (value: number) => void;
	id?: string;
}) {
	const [internalValue, setInternalValue] = useState(min);
	const currentValue = internalValue;
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (externalValue !== undefined) {
			setInternalValue(externalValue);
		}
	}, [externalValue]);

	const calulateNewValue = (clientY: number) => {
		const parentRect = ref.current?.getBoundingClientRect();
		if (!parentRect) return currentValue;

		const relativeY = clientY - parentRect.top;
		const clampedY = Math.max(0, Math.min(relativeY, parentRect.height));
		const newValue = Math.round((1 - clampedY / parentRect.height) * (max - 1));

		return newValue;
	};

	const updateValueAndNotify = () => {
		setInternalValue((v) => {
			v = Math.round(v);
			onChange?.(v);
			return v;
		});
	};

	const handleKeyBoard = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowUp" || e.key === "ArrowRight") {
			setInternalValue((v) => Math.min(v + 1, max - 1));
			onChange?.(Math.min(currentValue + 1, max - 1));
			e.preventDefault();
		}
		if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
			setInternalValue((v) => Math.max(v - 1, 0));
			onChange?.(Math.max(currentValue - 1, 0));
			e.preventDefault();
		}
	}

	const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();

		const parentRect = ref.current?.getBoundingClientRect();
		if (!parentRect) return;

		const onMouseMove = (moveEvent: MouseEvent) => {
			setInternalValue(calulateNewValue(moveEvent.clientY));
		};

		const onTouchMove = (touchEvent: TouchEvent) => {
			const touch = touchEvent.touches[0];
			setInternalValue(calulateNewValue(touch.clientY));
		};

		const onMouseUp = () => {
			updateValueAndNotify();
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
		const onTouchEnd = () => {
			updateValueAndNotify();
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
		};

		window.addEventListener("touchmove", onTouchMove, { passive: false });
		window.addEventListener("touchend", onTouchEnd);

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	return (
		<div
			className="simon-slider rounded-sm size-full flex flex-column gap-2 content-between p-2"
			style={{
				backgroundColor: "darkgrey",
				width: "clamp(60px, 20vw, 100px)",
			}}
			id={id}
		>
			<div className="relative size-full">						
				<div>
					<div
						className="absolute size-full flex flex-column flex-center content-between h-full left-1/2"
						style={{
							width: `3px`,
							transform: "translateX(-50%)",
							backgroundColor: "black",
						}}
						ref={ref}
					>
						{Array.from({ length: max }).map((_, i) => (
							<div
								key={i}
								style={{
									display: "absolute",
									height: "3px",
									width: `40px`,
									backgroundColor: "black",
									borderRadius: "2px",
								}}
							>
								<span
									style={{
										position: "relative",
										display: "block",
										left: "-30%",
										top: "-300%",
									}}
								>
									{max - i}
								</span>
							</div>
						))}
					</div>
				</div>
				<div
					className="ball absolute left-1/2 transform-center transition-all"
					style={{
						top: `${100 - (currentValue / (max - 1)) * 100}%`,
					}}
					role="slider"
					aria-valuemin={min}
					aria-valuemax={max - 1}
					aria-valuenow={currentValue}
					tabIndex={0}
					onMouseDown={handleInteraction}
					onTouchStart={handleInteraction}
					onKeyDown={handleKeyBoard}
				></div>
			</div>
			<div
				className="flex flex-center text-xl"
				style={{
					borderRadius: "10px",
					backgroundColor: "white",
					color: "black",
				}}
			>
				<span>{currentValue + 1}</span>
			</div>
		</div>
	);
}
