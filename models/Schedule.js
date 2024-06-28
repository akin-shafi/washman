// models/schedule.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db.js"; // Ensure this path is correct

class Schedule extends Model {}

Schedule.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pickup_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		delivery_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "schedules",
		// timestamps: false, // Disable timestamps
	}
);

export default Schedule;
