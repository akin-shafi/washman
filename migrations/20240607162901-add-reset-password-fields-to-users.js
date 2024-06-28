"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Users", "resetPasswordToken", {
			type: Sequelize.STRING,
			allowNull: true,
		});

		await queryInterface.addColumn("Users", "resetPasswordExpires", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Users", "resetPasswordToken");
		await queryInterface.removeColumn("Users", "resetPasswordExpires");
	},
};
// npx sequelize-cli migration:generate --name add-reset-password-fields-to-users

// npx sequelize-cli db:migrate
