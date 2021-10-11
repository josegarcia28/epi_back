import {Sequelize} from "sequelize"
require('dotenv').config();

console.log(process.env.USU);
export const db = new Sequelize(process.env.BD, process.env.USU, process.env.PASS, {
   define: {
      freezeTableName: true
    },
    host: 'localhost',
   dialect: 'mysql',
   //logging: true
});

