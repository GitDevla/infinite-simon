import { useEffect, useRef, useState } from "react";

export default function Slider({
	min = 0,
	max = 5,
	onChange,
}: {
	min?: number;
	max?: number;
	onChange?: (value: number) => void;
}) {
	const [value, setValue] = useState(min);
	const obj = useRef(null as HTMLInputElement | null);

	const handleValueChange = (newValue: number) => {
		setValue(newValue);
		onChange?.(newValue);
	};

	return (
		<div>
			<input
				ref={obj}
				type="range"
				min={min}
				max={max}
				step={1}
				defaultValue={min}
				onMouseUp={(e) =>
					handleValueChange(parseInt(e.currentTarget.value, 10))
				}
				onTouchEnd={(e) =>
					handleValueChange(parseInt(e.currentTarget.value, 10))
				}
			/>
			<span>{value}</span>
		</div>
	);
}
