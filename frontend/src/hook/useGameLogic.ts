import {useEffect, useRef, useState} from "react";
import {Game} from "../service/Game";
import {ReactPart} from "../service/Parts";
import type {Sequence} from "../service/Sequence";

export function useGameLogic() {
	const [score, setScore] = useState(0);
	const [gameOngoing, setGameOngoing] = useState(true);
	const [sequence, setSequence] = useState<Sequence | null>(null);
	const game = useRef<Game | null>(null);

	useEffect(() => {
		game.current = new Game();
		game.current.startNewGame(1);
		game.current.onNewRound(() => {
			if (game.current === null) return;
			setScore(game.current.getCurrentRound() - 1);
			setSequence(game.current.getSequence());
		});
		setSequence(game.current.getSequence());
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
