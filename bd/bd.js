import {Sequelize} from "sequelize"
require('dotenv').config();

export const db = new Sequelize(process.env.BD, process.env.USU, process.env.PASS, {
   define: {
      freezeTableName: true
    },
    host: 'localhost',
   dialect: 'mysql',
   //logging: true
});

