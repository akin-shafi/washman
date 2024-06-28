// pages/api/schedules/[id].js
import Schedule from "@/models/Schedule";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const schedule = await Schedule.findByPk(id);
			if (!schedule) {
				return res.status(404).json({ error: "Schedule not found" });
			}
			return res.status(200).json(schedule);
		} else if (req.method === "PUT") {
			const updatedSchedule = await Schedule.update(req.body, {
				where: { id: id },
				returning: true,
			});
			if (updatedSchedule[0] === 0) {
				return res.status(404).json({ error: "Schedule not found" });
			}
			const updatedData = await Schedule.findByPk(id);
			res.status(200).json(updatedData);
		} else if (req.method === "DELETE") {
			const result = await Schedule.destroy({
				where: { id: id },
			});
			if (result === 0) {
				return res.status(404).json({ error: "Schedule not found" });
			}
			res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
