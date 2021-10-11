"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Asignacion = bd_1.db.define('asignacion', {
    cod_asig: {
        type: sequelize_1.DataTypes.STRING(6),
        primaryKey: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Responsable: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
