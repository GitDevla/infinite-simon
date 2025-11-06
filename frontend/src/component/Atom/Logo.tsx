/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import clsx from "clsx";
import {useNavigate} from "react-router-dom";

export default function Logo({size = "small"}: {size?: "small" | "large"}) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (size === "large") navigate("/");
	};

	return (
		<div
			className={clsx(
				"font-bold select-none text-center w-fit",
				size === "small" ? "text-2xl" : "text-4xl font-extrabold",
				size === "large" && "cursor-pointer",
			)}
			onClick={handleClick}
			onKeyDown={handleClick}>
			<span className="text-simon-red">IN</span>
			<span className="text-simon-green">FI</span>
			<span className="text-simon-blue">NI</span>
			<span className="text-simon-yellow">TE </span>
			<br />
			simon
		</div>
	);
}
