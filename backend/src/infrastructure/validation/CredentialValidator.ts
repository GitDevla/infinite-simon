import { IValidator, ValidationResult } from "../../interfaces/services/IServices";

export class CredentialValidator implements IValidator {
    validateCredentials(username: string, password: string, email: string): ValidationResult {
        const emailValidation = this.validateEmail(email);
        if (!emailValidation.isValid) {
            return emailValidation;
        }

        const passwordValidation = this.validatePassword(password);
        if (!passwordValidation.isValid) {
            return passwordValidation;
        }

        const usernameValidation = this.validateUsername(username);
        if (!usernameValidation.isValid) {
            return usernameValidation;
        }
        
        return { isValid: true };
    }

    validateEmail(email: string): ValidationResult {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!String(email).toLowerCase().match(emailRegex)) {
            return { isValid: false, errorMessage: "Email does not match requirements" };
        }
        return { isValid: true };
    }

    validatePassword(password: string): ValidationResult {
        const specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const uppers = /[A-Z]/;
        const lowers = /[a-z]/;
        const numbers = /[0-9]/;
        
        if (password.length < 8 || !specials.test(password) || !uppers.test(password) || !lowers.test(password) || !numbers.test(password)) {
            let message = "Password must";
            if (password.length < 8) {
                message += " be at least 8 characters long,";
            }
            if (!uppers.test(password)) {
                message += " contain an uppercase letter,";
            }
            if (!lowers.test(password)) {
                message += " contain a lowercase letter,";
            }
            if (!numbers.test(password)) {
                message += " contain a number,";
            }
            if (!specials.test(password)) {
                message += " contain a special character,";
            }
            // Remove trailing comma
            message = message.replace(/,$/, '');
            return {
                isValid: false,
                errorMessage: message
            };
        }
        return { isValid: true };
    }

    validateUsername(username: string): ValidationResult {
        const specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specials.test(username)) {
            return { isValid: false, errorMessage: "Username may not contain specials" };
        }
        return { isValid: true };
    }
}
