import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonQuarterRing from "../component/ButtonQuarterRing";
import Knob from "../component/Knob";
import Slider from "../component/Slider";
import Switch from "../component/Switch";

describe("Switch Game Compoent", () => {
	test("Switch Exists", async () => {
		render(<Switch />);
		const switchElement = screen.getByRole("switch");
		expect(switchElement).toBeInTheDocument();
	});

	test("Switch Aria value", async () => {
		render(<Switch value={true} />);
		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveAttribute("aria-checked", "true");
	});

	test("Switch OnClick", async () => {
		render(<Switch />);
		const switchElement = screen.getByRole("switch");
		const user = userEvent;
		expect(switchElement).toHaveAttribute("aria-checked", "false");
		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("aria-checked", "true");
	});

	test("Switch OnClick FireEvent", async () => {
		let fired = 0;
		function onToggle(isOn: boolean) {
			fired++;
			expect(isOn).toBe(fired % 2 === 1);
		}
		render(<Switch onToggle={onToggle} />);
		const switchElement = screen.getByRole("switch");
		const user = userEvent;
		await user.click(switchElement);
		await user.click(switchElement);
		expect(fired).toBe(2);
	});
});

describe("Slider Game Component", () => {
	test("Slider Exists", async () => {
		render(<Slider />);
		const sliderElement = screen.getByRole("slider");
		expect(sliderElement).toBeInTheDocument();
	});

	test("Slider Aria Value", async () => {
		render(<Slider value={2} />);
		const sliderElement = screen.getByRole("slider");
		expect(sliderElement).toHaveAttribute("aria-valuenow", "2");
	});

	test("Slider OnChange FireEvent", async () => {
		let fired = 0;
		let expectedValue = 0;
		function onChange(value: number) {
			fired++;
			expectedValue = value;
		}
		render(<Slider onChange={onChange} />);
		const sliderElement = screen.getByRole("slider");
		sliderElement.focus();
		fireEvent.keyDown(sliderElement, {key: "ArrowUp", code: "ArrowUp"});
		fireEvent.keyDown(sliderElement, {key: "ArrowUp", code: "ArrowUp"});
		fireEvent.keyDown(sliderElement, {key: "ArrowDown", code: "ArrowDown"});
		expect(fired).toBe(3);
		expect(expectedValue).toBe(1);
	});
});

describe("ButtonQuarterRing Game Component", () => {
	test("ButtonQuarterRing Exists", async () => {
		render(<ButtonQuarterRing />);
		const buttonElement = screen.getByRole("button");
		expect(buttonElement).toBeInTheDocument();
	});
	test("ButtonQuarterRing OnClick", async () => {
		let fired = 0;
		function onPress() {
			fired++;
		}
		render(<ButtonQuarterRing onPress={onPress} />);
		const buttonElement = screen.getByRole("button");
		const user = userEvent;
		await user.click(buttonElement);
		expect(fired).toBe(1);
	});
});

describe("Knob Game Component", () => {
	test("Knob Exists", async () => {
		render(<Knob />);
		const knobElement = screen.getByRole("slider");
		expect(knobElement).toBeInTheDocument();
	});
	test("Knob Aria Value", async () => {
		render(<Knob value={2} />);
		const knobElement = screen.getByRole("slider");
		expect(knobElement).toHaveAttribute("aria-valuenow", "2");
	});
	test("Knob OnChange FireEvent", async () => {
		let fired = 0;
		let expectedValue = 0;
		function onChange(value: number) {
			fired++;
			expectedValue = value;
		}
		render(<Knob onChange={onChange} />);
		const knobElement = screen.getByRole("slider");
		knobElement.focus();
		fireEvent.keyDown(knobElement, {key: "ArrowUp", code: "ArrowUp"});
		fireEvent.keyDown(knobElement, {key: "ArrowUp", code: "ArrowUp"});
		fireEvent.keyDown(knobElement, {key: "ArrowDown", code: "ArrowDown"});
		expect(fired).toBe(3);
		expect(expectedValue).toBe(1);
	});
});
