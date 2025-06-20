const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
         host : process.env.DB_HOST,
        dialect : 'mysql',
        logging : false,
        dialectOptions : {
            //ssl option
        }        
    }
)

const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');

        await sequelize.sync({alter:false})
    } catch (error) {
        console.log("Unable to connect", error)
        process.exit(1);
    }
}
connectDB();
module.exports = sequelize;