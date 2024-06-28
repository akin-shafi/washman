// pages/api/customers/[id].js
import Customer from "@/models/Customer";

export default async function handler(req, res) {
	const { id } = req.query;

	try {
		if (req.method === "GET") {
			const customer = await Customer.findByPk(id);
			if (!customer) {
				return res.status(404).json({ error: "Customer not found" });
			}
			return res.status(200).json(customer);
		} else if (req.method === "PUT") {
			const updatedCustomer = await Customer.update(req.body, {
				where: { id: id },
				returning: true,
			});
			if (updatedCustomer[0] === 0) {
				return res.status(404).json({ error: "Customer not found" });
			}
			const updatedData = await Customer.findByPk(id);
			res.status(200).json(updatedData);
		} else if (req.method === "DELETE") {
			const result = await Customer.destroy({
				where: { id: id },
			});
			if (result === 0) {
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
