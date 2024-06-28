import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db.js"; // Assuming this is the correct path to your Sequelize connection

class Message extends Model {}
Message.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		// Add other fields as necessary
	},
	{
		sequelize,
		modelName: "messages",
		timestamps: true, // Enable timestamps if you want createdAt and updatedAt
	}
);

export default Message;
