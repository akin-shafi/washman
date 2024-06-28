// pages/api/messages/[id].js
import dbConnect from "@/utils/db";
import Message from "@/models/Message";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const message = await Message.findById(id);
			if (!message) {
				return res.status(404).json({ error: "Message not found" });
			}
			return res.status(200).json(message);
		} else if (req.method === "PUT") {
			const updatedMessage = await Message.findByIdAndUpdate(id, req.body, {
				new: true, // Return the updated document
				runValidators: true, // Ensure updated fields are validated
			});
			if (!updatedMessage) {
				return res.status(404).json({ error: "Message not found" });
			}
			res.status(200).json(updatedMessage);
		} else if (req.method === "DELETE") {
			const result = await Message.findByIdAndDelete(id);
			if (!result) {
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
