import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for Account
const accountSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User", // Reference to the User model
			required: true,
		},
		provider: {
			type: String,
			required: true,
		},
		providerAccountId: {
			type: String,
			required: true,
		},
		refreshToken: String,
		accessToken: String,
		accessTokenExpires: Date,
	},
	{
		collection: "accounts", // Optional: Specify the collection name if different from model name
		timestamps: true, // Enable timestamps (createdAt, updatedAt)
	}
);

// Create a model based on the schema
const Account = mongoose.model("Account", accountSchema);

export default Account;
