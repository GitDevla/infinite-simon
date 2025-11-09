import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GameMode, type GameType} from "../../service/Game";
import {Backend, type GameStartResponse} from "../../util/Backend";

enum Windows {
	SELECT = "SELECT",
	CREATE = "CREATE",
	JOIN = "JOIN",
}

export default function SimpleLobbyModal({lvlId}: {lvlId: GameType}) {
	const [currentWindow, setCurrentWindow] = useState<Windows>(Windows.SELECT);
	const navigate = useNavigate();

	const [game, setGame] = useState<GameStartResponse | null>(null);

	const createGame = async () => {
		const res = await Backend.startGame(GameMode.MultiPlayer, lvlId);
		if (res.ok && res.data) {
			setGame(res.data);
		}
	};

	useEffect(() => {
		if (currentWindow === Windows.CREATE) {
			createGame();
		}
	}, [currentWindow, lvlId]);

	const validateCode = async (id: number) => {
		const res = await Backend.joinMatch(id);
		if (res.ok && res.data) {
			setGame(res.data);
			return res.data.match.id;
		}
		return null;
	};

	const goToGameScreen = (id: number) => {
		navigate(`/game?difficulty=${lvlId}&mode=${GameMode.MultiPlayer}&matchID=${id}`);
	};

	return (
		<div>
			<div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 z-40"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary p-6 rounded-lg z-50 w-80 bg-bg-secondary">
				<h2 className="text-xl font-bold mb-4 text-center">Multiplayer Lobby</h2>
				{currentWindow === Windows.SELECT && (
					<div className="flex flex-col space-y-4">
						<button
							type="button"
							onClick={() => setCurrentWindow(Windows.CREATE)}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Create Lobby
						</button>
						<button
							type="button"
							onClick={() => setCurrentWindow(Windows.JOIN)}
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
							Join Lobby
						</button>
					</div>
				)}
				{currentWindow === Windows.CREATE && (
					<div>
						<p className="mb-4">Lobby created! Share the code with your friends to join.</p>
						{game ? (
							<div className="mb-4 p-4 bg-gray-200 rounded text-center">
								<span className="font-mono text-lg">{game.match.id}</span>
							</div>
						) : (
							<p>Loading...</p>
						)}
						<div className="flex justify-between">
							<button
								type="button"
								onClick={() => setCurrentWindow(Windows.SELECT)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
								Back
							</button>
							<button
								type="button"
								onClick={() => {
									if (game) goToGameScreen(game.match.id);
								}}
								className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
								Start Game
							</button>
						</div>
					</div>
				)}
				{currentWindow === Windows.JOIN && (
					<div>
						<p className="mb-4">Enter the lobby code to join:</p>
						<input
							type="text"
							placeholder="Lobby Code"
							className="w-full p-2 border border-gray-300 rounded mb-4"
						/>
						<div className="flex justify-between">
							<button
								type="button"
								onClick={() => setCurrentWindow(Windows.SELECT)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
								Back
							</button>
							<button
								type="button"
								onClick={() => {
									validateCode(
										Number((document.querySelector("input") as HTMLInputElement).value),
									).then(id => {
										if (id) goToGameScreen(id);
									});
								}}
								className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
								Join Lobby
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
