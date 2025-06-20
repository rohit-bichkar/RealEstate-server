const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')


const User = sequelize.define('User',{
     id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        IsAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
        },
},{
    tableName:'Users',
    timestamps:true,
})



module.exports = User;