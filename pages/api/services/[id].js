// pages/api/services/[id].js
import Service from "@/models/Service";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const service = await Service.findByPk(id);
			if (!service) {
				return res.status(404).json({ error: "Service not found" });
			}
			return res.status(200).json(service);
		} else if (req.method === "PUT") {
			const updatedService = await Service.update(req.body, {
				where: { id: id },
				returning: true,
			});
			if (updatedService[0] === 0) {
				return res.status(404).json({ error: "Service not found" });
			}
			const updatedData = await Service.findByPk(id);
			res.status(200).json(updatedData);
		} else if (req.method === "DELETE") {
			const result = await Service.destroy({
				where: { id: id },
			});
			if (result === 0) {
				return res.status(404).json({ error: "Service not found" });
			}
			res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
