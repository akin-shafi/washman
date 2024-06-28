// pages/api/schedules/[id].js
import dbConnect from "@/utils/db";
import Schedule from "@/models/Schedule";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const schedule = await Schedule.findById(id);
			if (!schedule) {
				return res.status(404).json({ error: "Schedule not found" });
			}
			return res.status(200).json(schedule);
		} else if (req.method === "PUT") {
			const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
				new: true, // Return updated document
				runValidators: true, // Validate the update operation
			});
			if (!updatedSchedule) {
				return res.status(404).json({ error: "Schedule not found" });
			}
			res.status(200).json(updatedSchedule);
		} else if (req.method === "DELETE") {
			const deletedSchedule = await Schedule.findByIdAndDelete(id);
			if (!deletedSchedule) {
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
