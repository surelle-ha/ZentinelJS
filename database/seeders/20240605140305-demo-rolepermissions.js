"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Role_Permissions",
			[
				{
					role_id: 1,
					permission_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					role_id: 1,
					permission_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					role_id: 1,
					permission_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					role_id: 1,
					permission_id: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					role_id: 1,
					permission_id: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					role_id: 2,
					permission_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("RolePermissions", null, {});
	},
};
