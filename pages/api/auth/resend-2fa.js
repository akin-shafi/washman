import User from "@/models/User";
import { generateAndSendTwoFactorToken } from "@/pages/api/twoFactorAuth";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email } = req.body;
		try {
			await dbConnect(); // Connect to the database
			const user = await User.findOne({ email }); // Use findOne without 'where' object
			console.log("user", user);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			await generateAndSendTwoFactorToken(user);
			res.status(200).json({ message: "2FA token resent" });
		} catch (error) {
			console.error("Error resending 2FA token:", error);
			res.status(500).json({ error: "Failed to resend 2FA token" });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
