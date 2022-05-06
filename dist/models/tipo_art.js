"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const Tipo_art = bd_1.db.define('tipo_arts', {
    cod_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Tipo_art;
