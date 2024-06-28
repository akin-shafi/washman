import Service from "@/models/Service";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const services = await Service.findAll();
			res.status(200).json(services);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newService = await Service.create(req.body);
			res.status(201).json(newService);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}