export abstract class SequencePart {
	public type: string;
	public id: string;
	public expectedValue: any;

	constructor(type: string, id: string, exectedValue: any) {
		this.type = type;
		this.id = id;
		this.expectedValue = exectedValue;
	}

	public abstract isCorrect(input: any): boolean;
}
