export default function Button({ color }: { color?: string }) {
	return (
		<input
			type="button"
			style={{
				backgroundColor: color,
				aspectRatio: "1/1",
				width: "5em",
			}}
		/>
	);
}
