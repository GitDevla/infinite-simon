import { IValidator, ValidationResult } from "../../interfaces/services/IServices";

export class CredentialValidator implements IValidator {
    validateCredentials(username: string, password: string, email: string): ValidationResult {
        const specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const uppers = /[A-Z]/;
        const lowers = /[a-z]/;
        const numbers = /[0-9]/;

        if (specials.test(username)) {
            return { isValid: false, errorMessage: "Username may not contain specials" };
        }

        if (password.length <= 8 || !specials.test(password) || !uppers.test(password) || !lowers.test(password) || !numbers.test(password)) {
            return { 
                isValid: false, 
                errorMessage: "Password must contain upper and lower case letters, a number, and a special character" 
            };
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!String(email).toLowerCase().match(emailRegex)) {
            return { isValid: false, errorMessage: "Email does not match requirements" };
        }

        return { isValid: true };
    }
}
