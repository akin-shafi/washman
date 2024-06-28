import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../utils/db.js";

class User extends Model {
	// Add methods if needed
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		resetPasswordToken: {
			type: DataTypes.STRING,
			allowNull: true,
			field: "resetPasswordToken",
		},
		resetPasswordExpires: {
			type: DataTypes.DATE,
			allowNull: true,
			field: "resetPasswordExpires",
		},
		twoFactorToken: {
			type: DataTypes.STRING,
			allowNull: true,
			field: "twoFactorToken",
		},
		twoFactorExpires: {
			type: DataTypes.DATE,
			allowNull: true,
			field: "twoFactorExpires",
		},
		twoFactorEnabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		modelName: "users",
		hooks: {
			beforeCreate: async (user) => {
				const salt = await bcrypt.genSalt(10); // Generate a unique salt for this user
				user.salt = salt;
				if (user.password) {
					user.password = await bcrypt.hash(user.password, salt);
					console.log("Password set:", user.password); // Log the hashed password
				} else {
					console.log("Password not set"); // Log a message if the password is not set
				}
			},

			beforeUpdate: async (user) => {
				if (user.changed("password")) {
					const salt = await bcrypt.genSalt(10); // Generate a new salt if the password is changed
					user.salt = salt;
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
		},
		timestamps: true,
	}
);

export default User;
