// pages/api/schedules/index.js
import dbConnect from "@/utils/db";
import Schedule from "@/models/Schedule";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	if (req.method === "GET") {
		try {
			const schedules = await Schedule.find();
			res.status(200).json(schedules);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const newSchedule = new Schedule(req.body);
			await newSchedule.save();
			res.status(201).json(newSchedule);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).end(); // Method Not Allowed
	}
}
