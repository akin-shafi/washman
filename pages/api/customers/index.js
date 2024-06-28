// pages/api/customers.js

import Customer from "@/models/Customer";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const customers = await Customer.findAll();
			res.status(200).json(customers);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	// handle other methods similarly
	if (req.method === "POST") {
		try {
			const newCustomer = await Customer.create(req.body);
			res.status(201).json(newCustomer);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
