'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'User',
			[
				{
					userID: 'rbalsgood',
					name: 'kyumin',
					age: 23,
					createdAt: '2021-06-16',
					updatedAt: '2021-06-16',
				},
				{
					userID: 'als9560',
					name: 'kyuja',
					age: 18,
					createdAt: '2018-03-01',
					updatedAt: '2018-03-01',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('User', null, {});
	},
};
