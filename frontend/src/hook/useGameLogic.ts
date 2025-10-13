import {useEffect, useRef, useState} from "react";
import {Game} from "../service/Game";
import {ReactPart} from "../service/Parts";
import type {Sequence} from "../service/Sequence";
import { GameType } from '../service/Game';

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export function useGameLogic() {
	const [score, setScore] = useState(0);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [sequence, setSequence] = useState<Sequence | null>(null);
	const game = useRef<Game | null>(null);

	useEffect(() => {
		const difficultyId = 1;
		const modeId = 1;
		game.current = new Game();

		fetch(`${serverUrl}/start-game`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({modeId, difficultyId}),
		})
			.then(response => response.json())
			.then(data => {
				console.log("Game started with seed:", data.game.seed);
				if (game.current === null) return;
				game.current.startNewGame(data.game.seed,GameType.Extended);
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

	const handleUserInput = (id: string, value: any) => {
		if (game.current === null) return;
		const action = new ReactPart(id, value);
		if (!game.current.checkPlayerInput(action)) setGameOngoing(false);
	};

	const moveSpeedInMs = Math.max(700 - score * 20, 400);

	return {
		score,
		gameOngoing,
		setGameOngoing,
		sequence,
		handleUserInput,
		moveSpeedInMs,
	};
}
