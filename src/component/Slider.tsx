import { useState } from "react";

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
			setValue(newValue);
		};
		const onMouseUp = () => {
			setValue((v) => {
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
				width: "75px",
				height: "300px",
				backgroundColor: "lightgray",
			}}
		>
			<div
				style={{
					position: "relative",
					height: "80%",
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
										left: "-20%",
									}}
								>
									{max - i - 1}
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
						top: `${100 - (value / (max - 1)) * 100}%`,
						cursor: "pointer",
						touchAction: "none",
						transition: "top 0.2s ease-out",
					}}
					onMouseDown={handleMouseDown}
				></div>
			</div>
			<div style={{ textAlign: "center", marginTop: "10px" }}>
				<span>{value}</span>
			</div>
		</div>
	);
}
