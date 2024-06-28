import Schedule from "@/models/Schedule";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const schedules = await Schedule.findAll();
			res.status(200).json(schedules);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newSchedule = await Schedule.create(req.body);
			res.status(201).json(newSchedule);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
