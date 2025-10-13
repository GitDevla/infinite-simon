import randomFactory from "../util/random";
import {ButtonPart, KnobPart, SliderPart, SwitchPart} from "./Parts";
import {Sequence} from "./Sequence";
import type {SequencePart} from "./SequencePart";

export enum GameType {Simple,Extended}

export class Game {
	private sequence: Sequence = new Sequence();
	private currentRound: number = 1;
	private gameOver: boolean = false;
	private onNewRoundCallbacks: (() => void)[] = [];
	private rng: () => number = randomFactory(Date.now());
	private gameType = GameType.Simple

	public startNewGame(seed:number, gameType: GameType): void {
		this.currentRound = 1;
		this.gameOver = false;
		this.sequence = new Sequence();
		this.rng = randomFactory(seed);
		this.generateNextSequance();
		this.gameType = gameType
	}

	private readonly extendedConstructors: Record<string, (rng: () => number) => SequencePart> = {
	button: (rng) => new ButtonPart(rng),
	slider: (rng) => new SliderPart(rng),
	knob: (rng) => new KnobPart(rng),
	switch: (rng) => new SwitchPart(rng),
	};

	private readonly simpleConstructors: Record<string, (rng: () => number) => SequencePart> = {
	button: (rng) => new ButtonPart(rng),
	};

	private generateNextSequance(): void {
		var partConstructors;
		if(this.gameType===GameType.Simple) {
			partConstructors = this.simpleConstructors;
		} else if(this.gameType===GameType.Extended) {
			partConstructors = this.extendedConstructors;
		} else {
			throw new Error(`Unknown game type: ${this.gameType}`);
		}
		const parts = this.sequence.getParts();
		const types = Object.keys(partConstructors);
		const difficultyIncrease = 2;
		const numberOfTypes = Math.min(Math.floor(parts.length / difficultyIncrease) + 1, types.length);
		console.log("Number of input types: %s", numberOfTypes);
		const randomType = types[Math.floor(this.rng() * numberOfTypes)];
		let nextPart: SequencePart;
		while (true) {
			const constructor = partConstructors[randomType];
			if (!constructor) {
				throw new Error(`Unknown sequence part type: ${randomType}`);
			}

			const nextPart = constructor(this.rng);

			// Always allow parts without expected value (like buttons)
			if (nextPart.expectedValue === null) {
				this.sequence.addPart(nextPart);
				break;
			}

			let lastExpectedValue = 0; // default to 0 (or false)
			const lastFound = parts
				.slice()
				.reverse()
				.find(part => part.id === nextPart.id);
			if (lastFound) {
				lastExpectedValue = lastFound.expectedValue;
			}

			// biome-ignore lint/suspicious/noDoubleEquals: intended
			if (lastExpectedValue != nextPart.expectedValue) {
				this.sequence.addPart(nextPart);
				break;
			}
		}
	}

	public checkPlayerInput(input: SequencePart): boolean {
		const currentPart = this.sequence.getCurrentPart();
		const expectedAction = currentPart.isCorrect(input);
		if (expectedAction) {
			this.sequence.moveToNextPart();
			if (this.sequence.isComplete()) {
				this.currentRound++;
				this.generateNextSequance();
				this.sequence.reset();
				this.onNewRoundCallbacks.forEach(cb => {
					cb();
				});
			}
		} else {
			this.gameOver = true;
		}

		return expectedAction;
	}

	public getCurrentRound(): number {
		return this.currentRound;
	}

	public isGameOver(): boolean {
		return this.gameOver;
	}

	public getSequence(): Sequence {
		const v = this.sequence;
		// Deep clone to prevent external mutations and ensure React detects changes
		return Object.assign(Object.create(Object.getPrototypeOf(v)), v);
	}

	public onNewRound(callback: () => void): void {
		this.onNewRoundCallbacks.push(callback);
	}
}
