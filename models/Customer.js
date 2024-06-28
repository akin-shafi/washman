// models/Customer.js
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js"; // Assuming this is the correct path to your Sequelize connection

const Customer = sequelize.define(
	"customers",
	{
		// Assuming you have fields such as id, firstName, lastName
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
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
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		// Add other fields as necessary
	},
	{
		sequelize,
		modelName: "customers",
		timestamps: false,
	}
);

export default Customer;
