// models/index.js
import Sequelize from "sequelize";
import dotenv from "dotenv";
import config from "../config/config.js"; // Adjust with your config specifics
import User from "./User";
import Customer from "./Customer";
import Schedule from "./Schedule"; // Import the Schedule model
import Message from "./Message"; // Import the Message model
import Service from "./Service"; // Import the Service model

// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

let sequelize;

if (dbConfig.use_env_variable) {
	sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
		dialect: dbConfig.dialect,
	});
} else {
	sequelize = new Sequelize(
		dbConfig.database,
		dbConfig.username,
		dbConfig.password,
		{
			host: dbConfig.host,
			dialect: dbConfig.dialect,
		}
	);
}

const models = {
	User: User.init(sequelize, Sequelize),
	Customer: Customer.init(sequelize, Sequelize),
	Schedule: Schedule.init(sequelize, Sequelize),
	Message: Message.init(sequelize, Sequelize),
	Service: Service.init(sequelize, Sequelize),
	// Add other models here
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

export { sequelize };
export default models;
