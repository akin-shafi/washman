"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Messages", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			subject: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			body: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});

		// Insert initial data
		await queryInterface.bulkInsert(
			"Messages",
			[
				{
					id: 1,
					name: "Shafi Adamu",
					email: "ades@email.com",
					phone: "08084758903",
					subject: "Enquiry",
					body: "When can i come for pickup",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 2,
					name: "Confidence Igwe",
					email: "article2@example.com",
					phone: "09012345678",
					subject: "Feedback",
					body: "I really enjoyed reading this article. Thank you!",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 3,
					name: "Juzi Major",
					email: "article3@example.com",
					phone: "07098765432",
					subject: "Question",
					body: "Can you provide more information about the research methodology used?",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 4,
					name: "Ibomoere Olumofa",
					email: "article4@example.com",
					phone: "08087654321",
					subject: "Collaboration Opportunity",
					body: "I am interested in collaborating on future projects. Please let me know how we can proceed.",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 5,
					name: "Fikayo Fuahd",
					email: "article5@example.com",
					phone: "08123456789",
					subject: "Correction",
					body: "There is a factual error in paragraph three. Could you please correct it?",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 6,
					name: "Afolabi Legunshen",
					email: "apho@example.com",
					phone: "08123456789",
					subject: "Correction",
					body: "There is a factual error in paragraph three. Could you please correct it?",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Messages");
	},
};
