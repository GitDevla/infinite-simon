import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameEndModal from "../component/Game/GameEndModal";

describe("Game End Screen Component", () => {
	test("Game End Modal Exists", async () => {
		render(<GameEndModal score={5} />);
		const modalElement = screen.getByRole("dialog");
		expect(modalElement).toBeInTheDocument();
	});

	test("Username Input and Save Button Functionality", async () => {
		render(<GameEndModal score={999} />);
		const user = userEvent;

		// mock reload function
		delete (window as any).location;
		(window as any).location = {reload: jest.fn()};

		const inputElement = screen.getByRole("textbox");
		expect(inputElement).toBeInTheDocument();

		await user.type(inputElement, "TestUser");
		expect((inputElement as HTMLInputElement).value).toBe("TestUser");

		const saveButton = screen.getAllByRole("button")[0];
		expect(saveButton).toBeInTheDocument();

		// Mock window.alert
		window.alert = jest.fn();

		await user.click(saveButton);
		expect(window.alert).toHaveBeenCalledWith("TestUser! Your 999 was successfully saved!");

		expect((window as any).location.reload).toHaveBeenCalled();
	});

	test("Save button without username reloads the page", async () => {
		render(<GameEndModal score={5} />);
		const user = userEvent;

		// mock reload function
		delete (window as any).location;
		(window as any).location = {reload: jest.fn()};

		const saveButton = screen.getAllByRole("button")[0];
		expect(saveButton).toBeInTheDocument();

		await user.click(saveButton);
		expect((window as any).location.reload).toHaveBeenCalled();
	});
});
