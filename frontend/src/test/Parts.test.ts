import {ButtonPart, KnobPart, SliderPart, SwitchPart} from "../service/Parts";

describe("ButtonPart test", () => {
	let input: ButtonPart;
	let part: ButtonPart;
	
	const rng = () => 0.5;

	beforeEach(() => {
		input = new ButtonPart(rng);
		part = new ButtonPart(rng);
	});

	test("correct input", () => {
		input.id = "red-simon";
		part.id = "red-simon";

		expect(part.isCorrect(input)).toBe(true);
	});

	test("incorrect input", () => {
		input.id = "green-simon";
		part.id = "blue-simon";

		expect(part.isCorrect(input)).toBe(false);
	});
});

describe("SwitchPart test", () => {
	let input: SwitchPart;
	let part: SwitchPart;

	const rng = () => 0.5;

	beforeEach(() => {
		input = new SwitchPart(rng);
		part = new SwitchPart(rng);
	});

	test("correct input", () => {
		input.id = "switch-1";
		input.expectedValue = false;
		part.id = "switch-1";
		part.expectedValue = false;

		expect(part.isCorrect(input)).toBe(true);
	});

	test("incorrect id", () => {
		input.id = "switch-1";
		input.expectedValue = false;
		part.id = "switch-2";
		part.expectedValue = false;

		expect(part.isCorrect(input)).toBe(false);
	});

	test("incorrect value", () => {
		input.id = "switch-1";
		input.expectedValue = false;
		part.id = "switch-1";
		part.expectedValue = true;

		expect(part.isCorrect(input)).toBe(false);
	});
});

describe("SliderPart test", () => {
	let input: SliderPart;
	let part: SliderPart;

	const rng = () => 0.5;

	beforeEach(() => {
		input = new SliderPart(rng);
		part = new SliderPart(rng);
	});

	test("correct input", () => {
		input.id = "slider-1";
		input.expectedValue = "2";
		part.id = "slider-1";
		part.expectedValue = "2";

		expect(part.isCorrect(input)).toBe(true);
	});

	test("incorrect id", () => {
		input.id = "slider-1";
		input.expectedValue = "2";
		part.id = "slider-2";
		part.expectedValue = "2";

		expect(part.isCorrect(input)).toBe(false);
	});

	test("incorrect value", () => {
		input.id = "slider-1";
		input.expectedValue = "2";
		part.id = "slider-1";
		part.expectedValue = "3";

		expect(part.isCorrect(input)).toBe(false);
	});
});

describe("KnobpartPart test", () => {
	let input: KnobPart;
	let part: KnobPart;
	const rng = () => 0.5;

	beforeEach(() => {
		input = new KnobPart(rng);
		part = new KnobPart(rng);
	});

	test("correct input", () => {
		input.id = "knob-1";
		input.expectedValue = "2";
		part.id = "knob-1";
		part.expectedValue = "2";

		expect(part.isCorrect(input)).toBe(true);
	});

	test("incorrect id", () => {
		input.id = "knob-1";
		input.expectedValue = "2";
		part.id = "knob-2";
		part.expectedValue = "2";

		expect(part.isCorrect(input)).toBe(false);
	});

	test("incorrect value", () => {
		input.id = "knob-1";
		input.expectedValue = "2";
		part.id = "knob-1";
		part.expectedValue = "3";

		expect(part.isCorrect(input)).toBe(false);
	});
});
