import { useEffect, useState } from "react";

export default function Slider({
	min = 0,
	max = 5,
	value: externalValue,
	onChange,
}: {
	min?: number;
	max?: number;
	value?: number;
	onChange?: (value: number) => void;
}) {
	const [internalValue, setInternalValue] = useState(min);
	const currentValue = internalValue;

	useEffect(() => {
		if (externalValue !== undefined) {
			setInternalValue(externalValue);
		}
	}, [externalValue]);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();

		const parentRect = (
			e.target as HTMLDivElement
		).parentElement?.getBoundingClientRect();
		if (!parentRect) return;

		const onMouseMove = (moveEvent: MouseEvent) => {
			const relativeY = moveEvent.clientY - parentRect.top;
			const clampedY = Math.max(0, Math.min(relativeY, parentRect.height));
			const newValue = Math.round(
				(1 - clampedY / parentRect.height) * (max - 1),
			);

			setInternalValue(newValue);
		};
		const onMouseUp = () => {
			setInternalValue((v) => {
				v = Math.round(v);
				onChange?.(v);
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
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "darkgrey",
				padding: "10px",
				display: "flex",
				flexDirection: "column",
				gap: "7%",
				justifyContent: "space-between",
			}}
		>
			<div
				style={{
					position: "relative",
					height: "100%",
				}}
			>
				<div>
					<div
						style={{
							position: "absolute",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between",
							height: "100%",
							width: `3px`,
							left: `50%`,
							transform: "translateX(-50%)",
							backgroundColor: "black",
						}}
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
					style={{
						width: `20px`,
						height: `20px`,
						backgroundColor: "red",
						borderRadius: "50%",
						position: "absolute",
						left: "50%",
						transform: "translate(-50%,-50%)",
						top: `${100 - (currentValue / (max - 1)) * 100}%`,
						cursor: "pointer",
						touchAction: "none",
						transition: "top 0.2s ease-out",
					}}
					onMouseDown={handleMouseDown}
				></div>
			</div>
			<div
				style={{
					textAlign: "center",
					backgroundColor: "white",
					fontSize: "1.5rem",
				}}
			>
				<span>{currentValue + 1}</span>
			</div>
		</div>
	);
}
