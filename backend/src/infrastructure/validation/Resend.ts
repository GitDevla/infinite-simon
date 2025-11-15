import { Resend } from "resend";
import { IEmailService } from "../../interfaces/services/IEmailService";

export class ResendEmailService implements IEmailService {
    private apiKey: string;
    private resend;
    private mockMode: boolean = false;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        if (!this.apiKey) {
            console.warn("Resend API key not provided. Email sending is disabled.");
            this.mockMode = true;
            return;
        }
        this.resend = new Resend(this.apiKey);
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        if (this.mockMode) {
            console.log(`Mock email to: ${to}, subject: ${subject}`);
            return;
        }
        await this.resend.emails.send({
            from: 'Infinite-Simon Don\'t Reply <simon@devla.dev>',
            to: [to],
            subject: subject,
            html: html,
        });
    }

    async sendRegistrationEmail(to: string, validationLink: string): Promise<void> {
        const subject = 'Welcome to Infinite-Simon! Confirm Your Email';
        const html = `
            <h1>Welcome to Infinite-Simon!</h1>
            <p>Thank you for registering. Please use the following link to verify your email address:</p>
            <h2>${validationLink}</h2>
            <p>If you did not sign up for this account, please ignore this email.</p>
        `;
        await this.sendEmail(to, subject, html);
    }

    async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
        const subject = 'Infinite-Simon Password Reset Request';
        const html = `
            <h1>Password Reset Request</h1>
            <p>We received a request to reset your password. Click the link below to reset it:</p>
            <a href="${resetLink}">Reset Your Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
        `;
        await this.sendEmail(to, subject, html);
    }
}