export interface IPasswordHasher {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}

export interface ITokenGenerator {
    generate(payload: any, expiresIn?: string): string;
    verify(token: string): any;
}

export interface IValidator {
    validateCredentials(username: string, password: string, email: string): ValidationResult;
    validateEmail(email: string): ValidationResult;
    validatePassword(password: string): ValidationResult;
    validateUsername(username: string): ValidationResult;
}

export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}
