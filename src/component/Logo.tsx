export default function Logo() {
	return (
		<div
			style={{
				fontSize: "1.5rem",
				fontWeight: "bold",
				userSelect: "none",
				textAlign: "center",
			}}
		>
			<span style={{ color: "var(--simon-red)" }}>IN</span>
			<span style={{ color: "var(--simon-green)" }}>FI</span>
			<span style={{ color: "var(--simon-blue)" }}>NI</span>
			<span style={{ color: "var(--simon-yellow)" }}>TE </span>
			simon
		</div>
	);
}
