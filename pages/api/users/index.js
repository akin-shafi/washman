import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendSignupEmail } from "@/lib/emailActions";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const users = await User.find();
			res.status(200).json({ data: users });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			// Validate req.body here if needed
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			const newUser = await User.create({
				...req.body,
				password: hashedPassword,
				salt: salt,
			});
			const { name, email } = newUser;
			// Send signup email asynchronously
			sendSignupEmail({ name, email })
				.then(() => {
					res.status(201).json({
						message: "Signup successful and email sent",
						data: newUser,
					});
				})
				.catch((error) => {
					console.error("Failed to send signup email:", error);
					res.status(201).json({
						message: "Signup successful but failed to send email",
						data: newUser,
					});
				});
		} catch (error) {
			console.error("Failed to create user:", error);
			res.status(500).json({ error: error.message });
		}
	} else {
		res.setHeader("Allow", ["GET", "POST"]);
		res.status(405).json({ message: `Method ${req.method} Not Allowed` });
	}
}
