"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
console.log(process.env.USU);
exports.db = new sequelize_1.Sequelize(process.env.BD, process.env.USU, process.env.PASS, {
    define: {
        freezeTableName: true
    },
    host: 'localhost',
    dialect: 'mysql',
    //logging: true
});
