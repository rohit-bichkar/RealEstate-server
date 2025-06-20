const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');



const Property = sequelize.define('Property',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("apartment", "house", "commercial", "land"), 
        allowNull: false,
    },
    image:{
         type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },

},{
    tableName: 'Property',
    timestamps:true,
})


module.exports = Property;