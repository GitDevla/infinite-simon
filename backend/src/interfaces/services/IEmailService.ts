export interface IEmailService {
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    sendRegistrationEmail(to: string, validationLink: string): Promise<void>;
    sendPasswordResetEmail(to: string, resetLink: string): Promise<void>;
}