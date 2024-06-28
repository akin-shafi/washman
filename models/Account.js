// models/account.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/db";

const Account = sequelize.define("Account", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: DataTypes.INTEGER,
	provider: DataTypes.STRING,
	providerAccountId: DataTypes.STRING,
	refresh_token: DataTypes.STRING,
	access_token: DataTypes.STRING,
	access_token_expires: DataTypes.DATE,
});

export default Account;
