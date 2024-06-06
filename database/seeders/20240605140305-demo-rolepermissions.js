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
				}, // Admin -> create_article
				{
					role_id: 1,
					permission_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> edit_article
				{
					role_id: 1,
					permission_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> delete_article
				{
					role_id: 1,
					permission_id: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Admin -> view_article
				{
					role_id: 2,
					permission_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Editor -> edit_article
				{
					role_id: 2,
					permission_id: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				}, // Editor -> view_article
				{
					role_id: 3,
					permission_id: 4,
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
