// twoFactorAuth.js
import crypto from "crypto";
// import transporter from "./emailConfig";
// import generateTwoFactorEmailTemplate from "@/emails/twoFactorEmail";
import { sendTwoFactorVerificationEmail } from "@/lib/emailActions";

// async function sendTwoFactorEmail(user, token) {
// 	try {
// 		const mailOptions = {
// 			from: process.env.EMAIL_USER,
// 			to: user.email,
// 			subject: "Your 2FA Code",
// 			html: generateTwoFactorEmailTemplate(user, token),
// 		};

// 		await transporter.sendMail(mailOptions);
// 	} catch (error) {
// 		console.error("Error sending email:", error);
// 		throw new Error("Failed to send 2FA email");
// 	}
// }

async function generateAndSendTwoFactorToken(user) {
	try {
		const token = crypto.randomBytes(3).toString("hex");
		const expires = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes

		await user.update({
			twoFactorToken: token,
			twoFactorExpires: expires,
		});

		// await sendTwoFactorEmail(user, token);
		await sendTwoFactorVerificationEmail(user, token);
	} catch (error) {
		console.error("Error generating or sending 2FA token:", error);
		throw new Error("Failed to generate or send 2FA token");
	}
}

export { generateAndSendTwoFactorToken };
