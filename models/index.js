// models/index.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./User"; // Update with your Mongoose models
import Customer from "./Customer"; // Update with your Mongoose models
import Schedule from "./Schedule"; // Update with your Mongoose models
import Message from "./Message"; // Update with your Mongoose models
import Service from "./Service"; // Update with your Mongoose models

// Load environment variables from .env file
dotenv.config();

const dbUrl = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(dbUrl);

// Access the default connection to MongoDB
const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
	console.log("Connected to MongoDB");
});

// Export your Mongoose models
export default {
	User,
	Customer,
	Schedule,
	Message,
	Service,
	// Add other models here
};
