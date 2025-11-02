import {useNavigate} from "react-router-dom";

/**
  * A modal component that appears at the end of the game, displaying the final score and providing navigation options to retry or return home.
 * @param score - The player's final score to display. Default is 0.
 */
export default function GameEndModal({score = 0}: {score?: number}) {
	const navigate = useNavigate();


	function handleKeyPress() {
		window.location.reload();
	}

	return (
		<>
			<div className="fixed top-0 left-0 size-full bg-black bg-opacity-50 z-[999]"></div>
			<div
				className="fixed p-2 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[1000] pointer-events-auto bg-[--bg-2]"
				role="dialog">
				<h2 className="mb-4 text-5xl">You lost</h2>
				<p className="mb-4">
					Your final score is: <strong>{score}</strong>
				</p>
				<button
					type="button"
					className={"rounded-xl cursor-pointer mt-4 px-4 py-3 text-xl min-w-[250px] bg-simon-green text-black"}
					onClick={handleKeyPress}>
					Give it one more try
				</button>
				<br />
				<button
					type="button"
					className={"rounded-xl cursor-pointer mt-4 px-4 py-3 text-lg min-w-[200px] bg-simon-red text-white"}
					onClick={() => {
						navigate("/");
					}}>
					Go back to home
				</button>
			</div>
		</>
	);
}
