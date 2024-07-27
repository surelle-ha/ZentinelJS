"use strict";
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    generateUser: async () => {
        const password = await bcrypt.hash('password', 10);
        return {
            id: uuidv4(),
            first_name: faker.person.firstName(),
            middle_name: faker.person.middleName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: password,
            role_id: faker.number.int({ min: 1, max: 2 }), 
            email_verified: faker.datatype.boolean(),
            status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
};
