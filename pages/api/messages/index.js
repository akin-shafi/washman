import dbConnect from "@/utils/db";
import Message from "@/models/Message";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	const { subject } = req.query;

	if (req.method === "GET") {
		try {
			let messages;
			if (subject) {
				// Fetch messages by subject
				messages = await Message.find({ subject });
				if (!messages || messages.length === 0) {
					return res.status(404).json({ error: "No messages found" });
				}
			} else {
				messages = await Message.find();
			}
			res.status(200).json(messages);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const newMessage = new Message(req.body);
			await newMessage.save();
			res.status(201).json(newMessage);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
