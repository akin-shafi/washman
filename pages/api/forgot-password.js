import { sendResetPasswordEmail } from "@/lib/emailActions";
import User from "@/models/User";
import crypto from "crypto";
import sequelize from "@/utils/db.js"; // Assuming you have a DB connection utility

export default async function handler(req, res) {
	if (req.method === "POST") {
		await sequelize.sync(); // Connect to the database
		const { email } = req.body;

		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			const resetToken = crypto.randomBytes(32).toString("hex");
			user.resetPasswordToken = crypto
				.createHash("sha256")
				.update(resetToken)
				.digest("hex");
			user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
			await user.save();

			// Send reset password email
			await sendResetPasswordEmail(user, resetToken);

			res.status(200).json({ message: "Password reset email sent" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
