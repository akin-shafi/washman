import dbConnect from "@/utils/db";
import Customer from "@/models/Customer";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	if (req.method === "GET") {
		try {
			const customers = await Customer.find(); // Use find directly on the model
			res.status(200).json(customers);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newCustomer = await Customer.create(req.body); // Use create directly on the model
			res.status(201).json(newCustomer);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
