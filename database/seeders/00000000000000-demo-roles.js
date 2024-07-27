"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Roles",
			[
				{ name: "Admin", createdAt: new Date(), updatedAt: new Date() },
				{ name: "User", createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
