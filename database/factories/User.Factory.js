"use strict";
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = {
    generateUser: async () => {
        const password = await bcrypt.hash('password', 10);
        return {
            first_name: faker.person.firstName(),
            middle_name: faker.person.middleName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: password,
            role_id: faker.number.int({ min: 1, max: 3 }), 
            email_verified: faker.datatype.boolean(),
            status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
};
