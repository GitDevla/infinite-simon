import {useContext, useEffect, useRef, useState} from "react";
import {Game, type GameMode, type GameType} from "../service/Game";
import {ReactPart} from "../service/Parts";
import type {Sequence} from "../service/Sequence";
import { AuthContext } from "../context/AuthContext";

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export function useGameLogic({gameType, gameMode}: {gameType: GameType; gameMode: GameMode}) {
	const [score, setScore] = useState(0);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [sequence, setSequence] = useState<Sequence | null>(null);
	const game = useRef<Game | null>(null);
	const userContext = useContext(AuthContext);
	const [matchId, setMatchId] = useState<number | null>(null);

	useEffect(() => {
		const difficultyId = gameType;
		const modeId = gameMode;
		game.current = new Game();

		fetch(`${serverUrl}/start-game`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// Enum IDs are 1-based in the backend
			body: JSON.stringify({modeId: modeId + 1, difficultyId: difficultyId + 1}),
		})
			.then(response => response.json())
			.then(data => {
				if (!data.game || !data.match) {
					console.error("No game object or match returned from backend");
					return;
				}
				setMatchId(data.match.id);
				console.log("Game started with id:", data.game.id, "and seed:", data.game.seed, "and match id:", data.match.id);
				if (game.current === null) return;
				game.current.startNewGame(data.game.seed, gameType);
				game.current.onNewRound(() => {
					if (game.current === null) return;
					setScore(game.current.getCurrentRound() - 1);
					setSequence(game.current.getSequence());
				});
				setSequence(game.current.getSequence());
			})
			.catch(error => {
				console.error("Error starting game:", error);
			});
	}, []);

	const saveGameResult = async (username: string, matchId: number, roundEliminated: number) => {
		const token = userContext.token;
		await fetch(`${serverUrl}/save-game-result`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			},
			body: JSON.stringify({ username, matchId, roundEliminated }),
		});
	};

	const handleUserInput = (id: string, value: any) => {
		if (game.current === null) return;
		const action = new ReactPart(id, value);
		if (!game.current.checkPlayerInput(action)) {
			setGameOngoing(false);
			console.log("Game over! Saving result...");
			// TODO: consider updating each round instead of only at game over
			if (matchId !== null) {
				if (userContext.username !== null) {
					saveGameResult(userContext.username, matchId, score);
				} else {
					console.error("Cannot save game result: username is null");
				}
			} else {
				console.error("Cannot save game result: matchId is null");
			}
		}
	};

	const moveSpeedInMs = Math.max(700 - score * 20, 400);

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
