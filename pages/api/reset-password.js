import User from "@/models/User";
import crypto from "crypto";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		await dbConnect();
		const { token, newPassword } = req.body;
		try {
			const hashedToken = crypto
				.createHash("sha256")
				.update(token)
				.digest("hex");
			const user = await User.findOneAndUpdate(
				{
					resetPasswordToken: hashedToken,
					resetPasswordExpires: { $gt: Date.now() },
				},
				{
					$set: {
						password: newPassword,
						resetPasswordToken: null,
						resetPasswordExpires: null,
					},
				},
				{ returnNewDocument: true }
			);
			if (!user) {
				return res.status(400).json({ message: "Invalid or expired token" });
			}
			res.status(200).json({ message: "Password has been reset successfully" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
