"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("users", "twoFactorToken", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "twoFactorExpires", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("users", "twoFactorToken");
		await queryInterface.removeColumn("users", "twoFactorExpires");
	},
};
