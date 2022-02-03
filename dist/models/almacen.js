"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Almacen = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Almacen = bd_1.db.define('Almacen', {
    cod_alm: {
        type: sequelize_1.DataTypes.STRING(6),
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
