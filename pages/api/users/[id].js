// pages/api/users/[id].js
import dbConnect from "@/utils/db";
import User from "@/models/User";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json(user);
		} else if (req.method === "PUT") {
			const user = await User.findByIdAndUpdate(id, req.body, {
				new: true, // Return the updated document
				runValidators: true, // Run Mongoose validators for updates
			});
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json(user);
		} else if (req.method === "DELETE") {
			const result = await User.findByIdAndDelete(id);
			if (!result) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(204).end();
		} else {
			return res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}
