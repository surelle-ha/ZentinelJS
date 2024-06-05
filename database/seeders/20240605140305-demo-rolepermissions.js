"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Role_Permissions",
			[
				{
					roleId: 1,
					permissionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> create_article
				{
					roleId: 1,
					permissionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> edit_article
				{
					roleId: 1,
					permissionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> delete_article
				{
					roleId: 1,
					permissionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> view_article
				{
					roleId: 2,
					permissionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Editor -> edit_article
				{
					roleId: 2,
					permissionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Editor -> view_article
				{
					roleId: 3,
					permissionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Viewer -> view_article
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("RolePermissions", null, {});
	},
};
