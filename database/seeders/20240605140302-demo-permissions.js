"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Permissions",
			[
				{
					name: "create_article",
					description: "Create articles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "edit_article",
					description: "Edit articles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "delete_article",
					description: "Delete articles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "view_article",
					description: "View articles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Permissions", null, {});
	},
};
