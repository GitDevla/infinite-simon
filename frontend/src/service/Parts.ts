import {SequencePart} from "./SequencePart";

export class ButtonPart extends SequencePart {
	private static AVAILABLE_IDS = ["simon-red", "simon-green", "simon-blue", "simon-yellow"];

	constructor() {
		super("button", ButtonPart.AVAILABLE_IDS[Math.floor(Math.random() * ButtonPart.AVAILABLE_IDS.length)], null);
	}

	public isCorrect(input: ButtonPart): boolean {
		return input.id === this.id;
	}
}

export class SliderPart extends SequencePart {
	private static AVAILABLE_IDS = ["slider-1"];

	constructor() {
		super(
			"slider",
			SliderPart.AVAILABLE_IDS[Math.floor(Math.random() * SliderPart.AVAILABLE_IDS.length)],
			Math.floor(Math.random() * 5),
		);
	}

	public isCorrect(input: SliderPart): boolean {
		return input.id === this.id && input.expectedValue === this.expectedValue;
	}
}

export class KnobPart extends SequencePart {
	private static AVAILABLE_IDS = ["knob-1", "knob-2"];

	constructor() {
		super(
			"knob",
			KnobPart.AVAILABLE_IDS[Math.floor(Math.random() * KnobPart.AVAILABLE_IDS.length)],
			Math.floor(Math.random() * 8),
		);
	}

	public isCorrect(input: KnobPart): boolean {
		return input.id === this.id && input.expectedValue === this.expectedValue;
	}
}

export class SwitchPart extends SequencePart {
	private static AVAILABLE_IDS = ["switch-1", "switch-2"];

	constructor() {
		super(
			"switch",
			SwitchPart.AVAILABLE_IDS[Math.floor(Math.random() * SwitchPart.AVAILABLE_IDS.length)],
			Math.random() >= 0.5,
		);
	}

	public isCorrect(input: SwitchPart): boolean {
		return input.id === this.id && input.expectedValue === this.expectedValue;
	}
}

/**
 * This class should not be used in the game logic, only for React component interaction
 */
export class ReactPart extends SequencePart {
	constructor(id: string, expectedValue: any) {
		super("react", id, expectedValue);
	}

	public isCorrect(_input: SequencePart): boolean {
		throw new Error("ReactPart is not meant to be used in game logic");
	}
}
