"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responsable = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Responsable = bd_1.db.define('Responsable', {
    cod_resp: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    }
});
