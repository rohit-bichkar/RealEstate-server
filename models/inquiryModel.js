const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Inquiry =  sequelize.define('Inquiry',{
     id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:true
    },
    phone: {
    type: DataTypes.STRING(20),
    allowNull: true
    },
    message: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
   tableName:'Inquiry',
   timestamps:true ,
});

module.exports = Inquiry