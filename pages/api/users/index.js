import User from "@/models/User";
import { sendSignupEmail } from "@/lib/emailActions";
export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newUser = await User.create(req.body);
			const { name, email } = newUser;

			// Send signup email
			await sendSignupEmail({ name, email });

			res
				.status(201)
				.json({ message: "Signup successful and email sent", newUser });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
