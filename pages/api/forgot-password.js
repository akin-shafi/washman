import { sendResetPasswordEmail } from "@/lib/emailActions";
import User from "@/models/User";
import crypto from "crypto";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		await dbConnect();
		const { email } = req.body;
		try {
			const resetToken = crypto.randomBytes(32).toString("hex");
			const user = await User.findOneAndUpdate(
				{ email },
				{
					$set: {
						resetPasswordToken: crypto
							.createHash("sha256")
							.update(resetToken)
							.digest("hex"),
						resetPasswordExpires: Date.now() + 3600000,
					},
				},
				{ returnNewDocument: true }
			);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			await sendResetPasswordEmail(user, resetToken);
			res.status(200).json({ message: "Password reset email sent" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
