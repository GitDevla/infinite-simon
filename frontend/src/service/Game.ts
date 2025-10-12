import randomFactory from "../util/random";
import {ButtonPart, KnobPart, SliderPart, SwitchPart} from "./Parts";
import {Sequence} from "./Sequence";
import type {SequencePart} from "./SequencePart";

export class Game {
	private sequence: Sequence = new Sequence();
	private currentRound: number = 1;
	private gameOver: boolean = false;
	private onNewRoundCallbacks: (() => void)[] = [];
	private rng: () => number = randomFactory(Date.now());

	public startNewGame(seed:number): void {
		this.currentRound = 1;
		this.gameOver = false;
		this.sequence = new Sequence();
		this.rng = randomFactory(seed);
		this.generateNextSequance();
	}

	private generateNextSequance(): void {
		const parts = this.sequence.getParts();
		const types = ["button", "switch", "slider", "knob"];
		const difficultyIncrease = 2;
		const numberOfTypes = Math.min(Math.floor(parts.length / difficultyIncrease) + 1, types.length);
		console.log("Number of input types: %s", numberOfTypes);
		const randomType = types[Math.floor(this.rng() * numberOfTypes)];
		let nextPart: SequencePart;
		while (true) {
			switch (randomType) {
				case "button":
					nextPart = new ButtonPart(this.rng);
					break;
				case "slider":
					nextPart = new SliderPart(this.rng);
					break;
				case "knob":
					nextPart = new KnobPart(this.rng);
					break;
				case "switch":
					nextPart = new SwitchPart(this.rng);
					break;
				default:
					throw new Error("Unkown seqence part type");
			}

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
