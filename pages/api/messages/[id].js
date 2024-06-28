// pages/api/messages/[id].js
import Message from "@/models/Message";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const message = await Message.findByPk(id);
			if (!message) {
				return res.status(404).json({ error: "Message not found" });
			}
			return res.status(200).json(message);
		} else if (req.method === "PUT") {
			const updatedMessage = await Message.update(req.body, {
				where: { id: id },
				returning: true,
			});
			if (updatedMessage[0] === 0) {
				return res.status(404).json({ error: "Message not found" });
			}
			const updatedData = await Message.findByPk(id);
			res.status(200).json(updatedData);
		} else if (req.method === "DELETE") {
			const result = await Message.destroy({
				where: { id: id },
			});
			if (result === 0) {
				return res.status(404).json({ error: "Message not found" });
			}
			res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
