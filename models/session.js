// models/session.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/db";

const Session = sequelize.define("Session", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: DataTypes.INTEGER,
	expires: DataTypes.DATE,
	sessionToken: DataTypes.STRING,
});

export default Session;
