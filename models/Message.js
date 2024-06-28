import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for Message
const messageSchema = new Schema(
	{
		name: {
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
		subject: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	{
		collection: "messages", // Optional: Specify the collection name if different from model name
		timestamps: true, // Enable timestamps (createdAt, updatedAt)
	}
);

// Create a model based on the schema
const Message =
	mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
