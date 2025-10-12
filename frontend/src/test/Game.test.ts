import {Game} from "../service/Game";
import {KnobPart} from "../service/Parts";

describe("Game class test", () => {
	let game: Game;

	beforeEach(() => {
		game = new Game();
		game.startNewGame(1);
	});

	test("New game start", () => {
		expect(game.getCurrentRound()).toBe(1);
		expect(game.isGameOver()).toBe(false);
		expect(game.getSequence().getParts().length).toBe(1);
	});

	test("advance to next round on correct input", () => {
		const part = game.getSequence().getCurrentPart();
		const result = game.checkPlayerInput(part);

		expect(result).toBe(true);
		expect(game.getCurrentRound()).toBe(2);
	});

	test("game over on incorrect input", () => {
		const rng = () => 0.5;
		const incorrectInput = new KnobPart(rng);
		const result = game.checkPlayerInput(incorrectInput);

		expect(game.isGameOver()).toBe(true);
		expect(result).toBe(false);
		expect(game.getCurrentRound()).toBe(1);
	});
});
