import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for Customer
const customerSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{
		collection: "customers", // Optional: Specify the collection name if different from model name
		timestamps: true, // Enable timestamps (createdAt, updatedAt)
	}
);

// Create a model based on the schema
const Customer =
	mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
