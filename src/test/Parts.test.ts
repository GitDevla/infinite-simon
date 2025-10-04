import {ButtonPart, KnobPart, SliderPart, SwitchPart} from "../service/Parts";

describe("ButtonPart test", () => {
	let input: ButtonPart;
	let part: ButtonPart;

	beforeEach(() => {
		input = new ButtonPart();
		part = new ButtonPart();
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

	beforeEach(() => {
		input = new SwitchPart();
		part = new SwitchPart();
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

	beforeEach(() => {
		input = new SliderPart();
		part = new SliderPart();
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

	beforeEach(() => {
		input = new KnobPart();
		part = new KnobPart();
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
