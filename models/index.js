// models/index.js
import Sequelize from "sequelize";
import config from "../config/config.json"; // Update with your config specifics
import User from "./User";
import Customer from "./Customer";
import Schedule from "./Schedule"; // Import the Schedule model
import Message from "./Message"; // Import the Message model
import Service from "./Service"; // Import the Service model

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

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
