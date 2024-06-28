import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for Schedule
const scheduleSchema = new Schema(
	{
		name: {
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
		pickupDate: {
			type: Date,
			required: true,
		},
		deliveryDate: {
			type: Date,
			required: true,
		},
	},
	{
		collection: "schedules", // Optional: Specify the collection name if different from model name
		timestamps: true, // Enable timestamps (createdAt, updatedAt)
	}
);

// Create a model based on the schema
const Schedule =
	mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
