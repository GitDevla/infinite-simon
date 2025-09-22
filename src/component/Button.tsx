export default function Button({
	color,
	onPress,
}: {
	color?: string;
	onPress?: () => void;
}) {
	return (
		<input
			type="button"
			onClick={onPress}
			style={{
				backgroundColor: color,
				aspectRatio: "1/1",
				width: "5em",
			}}
		/>
	);
}
