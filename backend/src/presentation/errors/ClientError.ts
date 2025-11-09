export class ClientError extends Error {
    httpStatusCode: number;

    constructor(message: string, httpStatusCode: number) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        Object.setPrototypeOf(this, ClientError.prototype);
    }
}

export class MissingParameterError extends ClientError {
    constructor(parameterName: string) {
        super(`Missing parameter: ${parameterName}`, 400);
        Object.setPrototypeOf(this, MissingParameterError.prototype);
    }
}

export class InvalidParameterError extends ClientError {
    constructor(parameterName: string) {
        super(`Invalid parameter: ${parameterName}`, 400);
        Object.setPrototypeOf(this, InvalidParameterError.prototype);
    }
}

export class UnauthorizedError extends ClientError {
    constructor(reason = "Unauthorized access") {
        super(`Unauthorized access: ${reason}`, 401);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class NotFoundError extends ClientError {
    constructor(resource: string) {
        super(`${resource} not found.`, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
