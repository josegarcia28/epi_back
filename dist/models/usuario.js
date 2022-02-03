"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Usuario = bd_1.db.define('Usuario', {
    uid: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: true,
    }
});
