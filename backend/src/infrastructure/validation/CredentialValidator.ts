import { IValidator } from "../../interfaces/services/IServices";
import { InvalidParameterError } from "../../presentation/errors/ClientError";

export class CredentialValidator implements IValidator {
    validateCredentials(username: string, password: string, email: string): void {
        this.validateEmail(email);
        this.validatePassword(password);
        this.validateUsername(username);
    }

    validateEmail(email: string): void {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!String(email).toLowerCase().match(emailRegex)) {
            throw new InvalidParameterError("Invalid email format");
        }
    }

    validatePassword(password: string): void {
        const specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const uppers = /[A-Z]/;
        const lowers = /[a-z]/;
        const numbers = /[0-9]/;
        let message = "Password must";
        const errors = [];
        if (password.length < 8) {
            errors.push(" be at least 8 characters long");
        }
        if (!uppers.test(password)) {
            errors.push(" contain an uppercase letter");
        }
        if (!lowers.test(password)) {
            errors.push(" contain a lowercase letter");
        }
        if (!numbers.test(password)) {
            errors.push(" contain a number");
        }
        if (!specials.test(password)) {
            errors.push(" contain a special character");
        }
        if (errors.length) {
            message += errors.join(",");
            throw new InvalidParameterError(message);
        }
    }

    validateUsername(username: string): void {
        const specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specials.test(username)) {
            throw new InvalidParameterError("Username cannot contain special characters");
        }
    }
}
