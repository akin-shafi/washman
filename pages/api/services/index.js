// pages/api/services/index.js
import dbConnect from "@/utils/db";
import Service from "@/models/Service";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	if (req.method === "GET") {
		try {
			const services = await Service.find();
			res.status(200).json(services);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const newService = new Service(req.body);
			await newService.save();
			res.status(201).json(newService);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).end(); // Method Not Allowed
	}
}
