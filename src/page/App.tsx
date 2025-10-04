import { Link } from "react-router-dom";
import Logo from "../component/Logo";

function App() {
	return (
		<nav className="flex justify-center items-center h-screen">
			<div className="rounded-t-3xl flex flex-col bg-[#757575] overflow-hidden">
				<div className="p-4 pt-0 mb-4 text-center text-3xl bg-[#575757] text-wrap">
					<Logo />
				</div>
				<div className="flex gap-2 flex-col">
					<Link
						to="/game"
						className="bg-[#aaa] text-center text-black rounded-xl border-[gray] p-3 mx-7 border-4"
					>
						Play!
					</Link>
					<Link
						to="/score"
						className="bg-[#aaa] text-center text-black rounded-xl border-[gray] p-3 mx-7 border-4"
					>
						Scoreboard!
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default App;
