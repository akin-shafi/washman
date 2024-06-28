// pages/api/customers/[id].js
import dbConnect from "@/utils/db";
import Customer from "@/models/Customer";

export default async function handler(req, res) {
	await dbConnect(); // Ensure database connection is established

	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const customer = await Customer.findById(id);
			if (!customer) {
				return res.status(404).json({ error: "Customer not found" });
			}
			return res.status(200).json(customer);
		} else if (req.method === "PUT") {
			const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!updatedCustomer) {
				return res.status(404).json({ error: "Customer not found" });
			}
			res.status(200).json(updatedCustomer);
		} else if (req.method === "DELETE") {
			const result = await Customer.findByIdAndDelete(id);
			if (!result) {
				return res.status(404).json({ error: "Customer not found" });
			}
			res.status(204).end();
		} else {
			res.status(405).end(); // Method Not Allowed
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
