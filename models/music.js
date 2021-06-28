const { DataTypes } = require('sequelize/types');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'music',
		{
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true,
			},
			singer: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			albumName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class music extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   music.init({
//     name: DataTypes.STRING,
//     singer: DataTypes.STRING,
//     albumName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'music',
//   });
//   return music;
// };
