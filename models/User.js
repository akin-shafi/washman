import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: null,
	},
	resetPasswordToken: {
		type: String,
		default: null,
	},
	resetPasswordExpires: {
		type: Date,
		default: null,
	},
	twoFactorToken: {
		type: String,
		default: null,
	},
	twoFactorExpires: {
		type: Date,
		default: null,
	},
	twoFactorEnabled: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
