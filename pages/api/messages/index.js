// import models from "@/models/Message";

// const { Message } = models;

// export default async function handler(req, res) {
// 	const { subject } = req.query;
// 	try {
// 		if (req.method === "GET") {
// 			if (subject) {
// 				// Fetch messages by subject
// 				const messages = await Message.findAll({
// 					where: { subject },
// 				});
// 				if (!messages || messages.length === 0) {
// 					return res.status(404).json({ error: "No messages found" });
// 				}
// 				return res.status(200).json(messages);
// 			} else {
// 				// Fetch all messages
// 				const messages = await Message.findAll();
// 				return res.status(200).json(messages);
// 			}
// 		} else if (req.method === "POST") {
// 			const message = req.body;
// 			const newMessage = await Message.create(message);
// 			return res.status(201).json(newMessage);
// 		} else {
// 			res.status(405).end(); // Method Not Allowed
// 		}
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

import Message from "@/models/Message";

export default async function handler(req, res) {
	const { subject } = req.query;

	if (req.method === "GET") {
		try {
			if (subject) {
				// Fetch messages by subject
				const messages = await Message.findAll({
					where: { subject },
				});
				if (!messages || messages.length === 0) {
					return res.status(404).json({ error: "No messages found" });
				}
				return res.status(200).json(messages);
			} else {
				const messages = await Message.findAll();
				res.status(200).json(messages);
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newMessage = await Message.create(req.body);
			res.status(201).json(newMessage);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
