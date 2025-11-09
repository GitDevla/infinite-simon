import {useContext, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext";
import {Game, type GameMode, type GameType} from "../service/Game";
import {ReactPart} from "../service/Parts";
import type {Sequence} from "../service/Sequence";
import {Backend} from "../util/Backend";

export function useGameLogic({
	gameType,
	gameMode,
	initialMatchId,
}: {
	gameType: GameType;
	gameMode: GameMode;
	initialMatchId?: number;
}) {
	const [score, setScore] = useState(0);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [sequence, setSequence] = useState<Sequence | null>(null);
	const game = useRef<Game | null>(null);
	const userContext = useContext(AuthContext);
	const [matchId, setMatchId] = useState<number | null>(initialMatchId ?? null);

	const startNewGame = async () => {
		const res = await Backend.startGame(gameMode, gameType);
		if (!res.ok) {
			console.error("Error starting game:", res.error);
			return;
		}
		const data = res.data;
		if (!data.game || !data.match) {
			console.error("No game object or match returned from backend");
			return;
		}
		setMatchId(data.match.id);
		console.log(
			"Game started with id:",
			data.game.id,
			"and seed:",
			data.match.seed,
			"and match id:",
			data.match.id,
		);
		if (game.current === null) return;
		game.current.startNewGame(data.match.seed, gameType);
		game.current.onNewRound(() => {
			if (game.current === null) return;
			setScore(game.current.getCurrentRound() - 1);
			setSequence(game.current.getSequence());
		});
		setSequence(game.current.getSequence());
	};

	const joinMatch = async (matchId: number) => {
		const res = await Backend.joinMatch(matchId);
		if (!res.ok) {
			console.error("Error joining match:", res.error);
			return;
		}
		const data = res.data;
		if (!data.game || !data.match) {
			console.error("No game object or match returned from backend");
			return;
		}
		setMatchId(data.match.id);
		console.log("Joined match with id:", data.match.id);
		if (game.current === null) return;
		game.current.startNewGame(data.match.seed, gameType);
		game.current.onNewRound(() => {
			if (game.current === null) return;
			setScore(game.current.getCurrentRound() - 1);
			setSequence(game.current.getSequence());
		});
		setSequence(game.current.getSequence());
	};

	useEffect(() => {
		game.current = new Game();
		if (initialMatchId) {
			joinMatch(initialMatchId);
		} else {
			startNewGame();
		}
	}, []);

	const saveGameResult = async (matchId: number, roundEliminated: number) => {
		const res = await Backend.saveGameResult(matchId, roundEliminated);
		if (res.ok) {
			toast.success("Game result saved successfully");
		} else {
			console.error("Error saving game result:", res.error);
		}
	};

	const handleUserInput = (id: string, value: any) => {
		if (game.current === null) return;
		const action = new ReactPart(id, value);
		if (!game.current.checkPlayerInput(action)) {
			setGameOngoing(false);
		}
	};

	const moveSpeedInMs = Math.max(700 - score * 20, 400);

	useEffect(() => {
		if (!gameOngoing) {
			console.log("Game over! Saving result...");
			if (matchId !== null) {
				if (userContext.loggedIn) {
					saveGameResult(matchId, score);
				} else {
					console.warn("Cannot save game result: user not logged in");
				}
			} else {
				console.error("Cannot save game result: matchId is null");
			}
		}
	}, [gameOngoing]);

	return {
		score,
		gameOngoing,
		setGameOngoing,
		sequence,
		handleUserInput,
		moveSpeedInMs,
		saveGameResult,
	};
}
