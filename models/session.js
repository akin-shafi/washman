// models/session.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for Session
const sessionSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId, // Assuming userId is referencing a User document
			ref: "User", // Reference to the User model
			required: true,
		},
		expires: {
			type: Date,
			required: true,
		},
		sessionToken: {
			type: String,
			required: true,
		},
	},
	{
		collection: "sessions", // Optional: Specify the collection name if different from model name
		timestamps: true, // Enable timestamps (createdAt, updatedAt)
	}
);

// Create a model based on the schema
const Session = mongoose.model("Session", sessionSchema);

export default Session;
