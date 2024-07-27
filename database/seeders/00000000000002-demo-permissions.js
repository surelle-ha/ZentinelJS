"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Permissions",
			[
				{
					name: "basic-authorization",
					description: "Default Base Authorization. All users should have this authorization regardless of designation,position or role.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "create-user",
					description: "Create User",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "delete-user",
					description: "Delete User",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "update-user",
					description: "Update User",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "fetch-user",
					description: "Get User(s)",
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Permissions", null, {});
	},
};
