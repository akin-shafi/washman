import crypto from "crypto";
import { sendTwoFactorVerificationEmail } from "@/lib/emailActions";
import User from "@/models/User";

async function generateAndSendTwoFactorToken(user) {
	try {
		const token = crypto.randomBytes(3).toString("hex");
		const expires = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes
		await User.updateOne(
			{ _id: user._id },
			{ $set: { twoFactorToken: token, twoFactorExpires: expires } }
		);
		// await sendTwoFactorEmail(user, token);
		await sendTwoFactorVerificationEmail(user, token);
	} catch (error) {
		console.error("Error generating or sending 2FA token:", error);
		throw new Error("Failed to generate or send 2FA token");
	}
}

export { generateAndSendTwoFactorToken };
