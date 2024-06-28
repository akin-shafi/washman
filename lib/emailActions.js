import signupEmail from "../emails/signupEmail";
import resetPasswordEmail from "../emails/resetPasswordEmail";
import twoFactorEmail from "../emails/twoFactorEmail";
import { sendEmail } from "./email";

// Function to send signup email
export async function sendSignupEmail(user) {
	const subject = "Welcome to Our App!";
	const html = signupEmail(user);
	await sendEmail(user.email, subject, html);
}

// Function to send password reset email
export async function sendResetPasswordEmail(user, resetToken) {
	const subject = "Password Reset Request";
	const html = resetPasswordEmail(user, resetToken);
	await sendEmail(user.email, subject, html);
}

export async function sendTwoFactorVerificationEmail(user, resetToken) {
	const subject = "Your 2FA Code";
	const html = twoFactorEmail(user, resetToken);
	await sendEmail(user.email, subject, html);
}
