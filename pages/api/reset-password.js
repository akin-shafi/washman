import User from "@/models/User";
import sequelize from "@/utils/db";
import crypto from "crypto";
// import bcrypt from "bcryptjs";
import { Op } from "sequelize"; // Import Op from sequelize

export default async function handler(req, res) {
	if (req.method === "POST") {
		await sequelize.sync(); // Ensure the database is connected
		const { token, newPassword } = req.body;

		try {
			const hashedToken = crypto
				.createHash("sha256")
				.update(token)
				.digest("hex");

			const user = await User.findOne({
				where: {
					resetPasswordToken: hashedToken,
					resetPasswordExpires: { [Op.gt]: Date.now() }, // Use Op.gt
				},
			});

			if (!user) {
				return res.status(400).json({ message: "Invalid or expired token" });
			}

			// const hashedPassword = await bcrypt.hash(newPassword, 10);

			await user.update({
				password: newPassword,
				resetPasswordToken: null,
				resetPasswordExpires: null,
			});

			res.status(200).json({ message: "Password has been reset successfully" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
