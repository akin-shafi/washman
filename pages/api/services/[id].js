// pages/api/services/[id].js
import dbConnect from "@/utils/db";
import Service from "@/models/Service";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const service = await Service.findById(id);
			if (!service) {
				return res.status(404).json({ error: "Service not found" });
			}
			return res.status(200).json(service);
		} else if (req.method === "PUT") {
			const updatedService = await Service.findByIdAndUpdate(id, req.body, {
				new: true, // Return updated document
				runValidators: true, // Validate the update operation
			});
			if (!updatedService) {
				return res.status(404).json({ error: "Service not found" });
			}
			res.status(200).json(updatedService);
		} else if (req.method === "DELETE") {
			const deletedService = await Service.findByIdAndDelete(id);
			if (!deletedService) {
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
