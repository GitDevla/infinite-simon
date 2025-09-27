import { SequencePart } from "./SequencePart"

export class ButtonPart extends SequencePart{
    private static VALID_COLORS = ["red", "green", "blue", "yellow"];

    constructor(){
        super("button", ButtonPart.VALID_COLORS[
            Math.floor(Math.random() * ButtonPart.VALID_COLORS.length)
        ])
    }

    public isCorrect(input: any): boolean {
        return input === this.expectedValue;
    }
}

export class SliderPart extends SequencePart{
    constructor(){
        super("slider", Math.floor(Math.random() * 6))
    }

    public isCorrect(input: any): boolean {
        return input === this.expectedValue;
    }
}

export class KnobPart extends SequencePart{
    constructor(){
        super("knob", Math.floor(Math.random() * 8))
    }

    public isCorrect(input: any): boolean {
        return input === this.expectedValue;
    }
}

export class SwitchPart extends SequencePart{
    constructor(){
        super("switch", Math.random() >= 0.5);
    }

    public isCorrect(input: any): boolean {
        return input === this.expectedValue;
    }
}