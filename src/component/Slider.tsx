import { useRef, useState } from "react";

export default function Slider({
	min = 0,
	max = 5,
}: {
	min?: number;
	max?: number;
}) {
	const [value, setValue] = useState(min);
	const obj = useRef(null as HTMLInputElement | null);

	return (
		<div>
			<input
				ref={obj}
				type="range"
				min={min}
				max={max}
				step={1}
				defaultValue={min}
				onMouseUp={(e) => setValue(parseInt(e.currentTarget.value, 10))}
				onTouchEnd={(e) => setValue(parseInt(e.currentTarget.value, 10))}
			/>
			<span>{value}</span>
		</div>
	);
}
