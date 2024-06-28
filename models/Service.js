import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for Service
const serviceSchema = new Schema(
	{
		heading: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
	},
	{
		collection: "services", // Optional: Specify the collection name if different from model name
		timestamps: false, // Disable timestamps
	}
);

// Create a model based on the schema
const Service = mongoose.model("Service", serviceSchema);

export default Service;
