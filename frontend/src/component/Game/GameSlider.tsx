import type React from "react";
import {useEffect, useRef, useState} from "react";
import useSound from "use-sound";


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
		setInternalValue(v => {
			v = Math.round(v);
			onChange?.(v);
			return v;
		});
	};

	const handleKeyBoard = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowUp" || e.key === "ArrowRight") {
			setInternalValue(v => Math.min(v + 1, max - 1));
			onChange?.(Math.min(currentValue + 1, max - 1));
			e.preventDefault();
		}
		if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
			setInternalValue(v => Math.max(v - 1, 0));
			onChange?.(Math.max(currentValue - 1, 0));
			e.preventDefault();
		}
	};

	const [sliderSound] = useSound(`${process.env.PUBLIC_URL}/slider.mp3`);

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
			sliderSound();
			updateValueAndNotify();
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
		const onTouchEnd = () => {
			sliderSound();
			updateValueAndNotify();
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
		};

		window.addEventListener("touchmove", onTouchMove, {passive: false});
		window.addEventListener("touchend", onTouchEnd);

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	return (
		<div
			className="simon-slider rounded-lg size-full flex flex-col gap-2 content-between p-2 bg-gray-400 min-w-[60px] w-[20vw] max-w-[100px]"
			id={id}>
			<div className="relative size-full">
				<div
					className="absolute size-full flex flex-col items-center justify-between h-full left-1/2 w-1 -translate-x-1/2 bg-black"
					ref={ref}>
					{Array.from({length: max}).map((_, i) => (
						<div key={i} className="h-1 w-10 bg-black rounded-sm">
							<span className="relative block left-[-30%] top-[-300%]">{max - i}</span>
						</div>
					))}
				</div>
				<div
					className="ball absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
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
					onKeyDown={handleKeyBoard}></div>
			</div>
			<div className="flex justify-center items-center text-xl rounded-xl bg-white text-black">
				<span>{currentValue + 1}</span>
			</div>
		</div>
	);
}
