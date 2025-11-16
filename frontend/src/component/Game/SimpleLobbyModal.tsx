import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GameMode, type GameType } from "../../service/Game";
import { Backend, type GameStartResponse } from "../../util/Backend";
import FloatingInput from "../Atom/FloatingInput";
import ParticipantList from "./ParticipantList";

enum Windows {
	SELECT = "SELECT",
	CREATE = "CREATE",
	JOIN = "JOIN",
	LOBBY = "LOBBY",
}

export default function SimpleLobbyModal({ lvlId, modalClose }: { lvlId: GameType; modalClose: () => void }) {
	const [currentWindow, setCurrentWindow] = useState<Windows>(Windows.SELECT);
	const navigate = useNavigate();

	const [game, setGame] = useState<GameStartResponse | null>(null);

	const createGame = async () => {
		const res = await Backend.startGame(GameMode.MultiPlayer, lvlId);
		if (res.ok && res.data) {
			setGame(res.data);
			let res2 = await Backend.joinMatch(res.data.match.id);
			if (res2.ok) {
				toast.success("You have created and joined the lobby!");
			} else {
				toast.error("Failed to join the created lobby.");
			}
		} else {
			toast.error("Failed to create a multiplayer game. Please try again.");
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: not needed
	useEffect(() => {
		if (currentWindow === Windows.CREATE) {
			createGame();
		}
	}, [currentWindow, lvlId]);

	const validateCode = async (id: number) => {
		const res = await Backend.joinMatch(id);
		if (res.ok && res.data) {
			setGame(res.data);
			toast.success("Successfully joined the lobby!");
			return res.data.match.id;
		}
		toast.error("Invalid lobby code. Please try again.");
		return null;
	};

	const goToGameScreen = (id: number) => {
		navigate(`/game?difficulty=${lvlId}&mode=${GameMode.MultiPlayer}&matchID=${id}`);
	};


	useEffect(() => {
		if (currentWindow === Windows.LOBBY && game) {
			let interval = setInterval(async () => {
				const res = await Backend.getMatchStatus(game.match.id);
				if (res.ok && res.data.status.status === "playing") {
					goToGameScreen(game.match.id);
				}
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [currentWindow]);

	const [inputtedCode, setInputtedCode] = useState<string>("");

	return (
		<div>
			{/** biome-ignore lint/a11y/noStaticElementInteractions: something has to be responsible */}
			<div
				className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 z-40"
				onClick={modalClose}
				onKeyDown={modalClose}></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary p-6 rounded-lg z-50 w-80 bg-bg-secondary">
				<h2 className="text-xl font-bold mb-4 text-center">Multiplayer</h2>
				{currentWindow === Windows.SELECT && (
					<div className="flex flex-col space-y-4">
						<button
							type="button"
							onClick={() => setCurrentWindow(Windows.CREATE)}
							className="bg-simon-blue text-white px-4 py-2 rounded hover:bg-opacity-80">
							Create Lobby
						</button>
						<button
							type="button"
							onClick={() => setCurrentWindow(Windows.JOIN)}
							className="bg-simon-green text-black px-4 py-2 rounded hover:bg-opacity-80">
							Join Lobby
						</button>
					</div>
				)}
				{currentWindow === Windows.CREATE && (
					<div>
						<p className="mb-4">Lobby created! Share the code with your friends to join.</p>
						{game ? (
							<div className="mb-4 p-4 rounded text-center">
								<span className="font-mono text-4xl">{game.match.id}</span>
							</div>
						) : (
							<p>Loading...</p>
						)}
						<div className="mb-4">
							{game && <ParticipantList matchID={game.match.id} showStatus={false} />}
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								onClick={() => setCurrentWindow(Windows.SELECT)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-opacity-80">
								Back
							</button>
							<button
								type="button"
								onClick={() => {
									if (game) goToGameScreen(game.match.id);
								}}
								className="ml-4 bg-simon-blue text-white px-4 py-2 rounded hover:bg-opacity-80">
								Start Game
							</button>
						</div>
					</div>
				)}
				{currentWindow === Windows.JOIN && (
					<div>
						<p className="mb-4">Enter the lobby code to join:</p>
						<div className="mb-4">
							<FloatingInput
								label="Lobby Code"
								setState={setInputtedCode}
								state={inputtedCode}
								type="text"
							/>
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								onClick={() => setCurrentWindow(Windows.SELECT)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-opacity-80">
								Back
							</button>
							<button
								type="button"
								onClick={() => {
									validateCode(Number(inputtedCode)).then(id => {
										if (id) setCurrentWindow(Windows.LOBBY);
									});
								}}
								className="ml-4 bg-simon-green text-white px-4 py-2 rounded hover:bg-opacity-80">
								Join Lobby
							</button>
						</div>
					</div>
				)}
				{currentWindow === Windows.LOBBY && (
					<div>
						<p>Waiting for the game to start...</p>
						{game && <ParticipantList matchID={game.match.id} showStatus={false} />}
						<div className="flex justify-between mt-4">
							<button
								type="button"
								onClick={() => setCurrentWindow(Windows.SELECT)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-opacity-80">
								Leave Lobby
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
