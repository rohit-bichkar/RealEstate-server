const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Interested = sequelize.define('Interested', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Ensure this matches the actual Users table name
      key: 'id',
    },
    allowNull: false,
  },
  propertyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Property', // Ensure this matches the actual Properties table name
      key: 'id',
    },
    allowNull: false,
  },
  interestedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Interested',
  timestamps: true,
});

module.exports = Interested;