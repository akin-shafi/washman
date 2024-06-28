// pages/api/users/[id].js
import User from "@/models/User";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const user = await User.findByPk(id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json(user);
		} else if (req.method === "PUT") {
			const user = await User.findByPk(id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			Object.keys(req.body).forEach((key) => {
				user[key] = req.body[key];
			});

			await user.save(); // This will trigger the hooks

			const updatedData = await User.findByPk(id);
			return res.status(200).json(updatedData);
		} else if (req.method === "DELETE") {
			const result = await User.destroy({
				where: { id: id },
			});
			if (result === 0) {
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

// $2a$10$3hIiwh8QnzPceU4dqwacbOy2SJejbSl3xU8V5.U8uwV.p90CjQVIa