import clsx from "clsx";

export default function Logo({size = "small"}: {size?: "small" | "large"}) {
	return (
		<div
			className={clsx(
				"font-bold select-none text-center",
				size === "small" ? "text-2xl" : "text-4xl font-extrabold",
			)}>
			<span className="text-simon-red">IN</span>
			<span className="text-simon-green">FI</span>
			<span className="text-simon-blue">NI</span>
			<span className="text-simon-yellow">TE </span>
			<br />
			simon
		</div>
	);
}
