import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameEndModal from "../component/Game/GameEndModal";

describe("Game End Screen Component", () => {
	test("Game End Modal Exists", async () => {
		render(<GameEndModal score={5} />);
		const modalElement = screen.getByRole("dialog");
		expect(modalElement).toBeInTheDocument();
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
