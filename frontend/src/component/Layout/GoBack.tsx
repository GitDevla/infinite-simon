import {useNavigate} from "react-router-dom";

export default function GoBack() {
	const navigate = useNavigate();

	const handleClick = () => {
		if (window.history.length > 1) navigate(-1);
		else navigate("/");
	};

	return (
		<button
			type="button"
			aria-label="Go back"
			onClick={handleClick}
			className="group mb-4 border rounded-full bg-bg-secondary font-medium fixed left-4 bottom-4 aspect-square size-12 hover:bg-bg-secondary-hover flex items-center justify-center p-2 transition-transform duration-200 transform hover:scale-105 focus:outline-none z-50">
			<svg
				viewBox="0 0 24 24"
				className="w-6 h-6 text-primary transition-transform duration-300 transform group-hover:-translate-x-1"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true">
				<path
					d="M20 12H8"
					className="transition-transform duration-300 transform group-hover:-translate-x-1"
					style={{transformBox: "fill-box", transformOrigin: "center"}}
				/>
				<path
					d="M13 6l-6 6 6 6"
					className="transition-transform duration-300 transform  group-hover:-translate-x-1 group-hover:scale-105"
					style={{transformBox: "fill-box", transformOrigin: "center"}}
				/>
			</svg>
		</button>
	);
}
