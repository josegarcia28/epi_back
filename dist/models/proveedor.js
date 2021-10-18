"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Proveedor = bd_1.db.define('Proveedor', {
    cif_pro: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    Direccion: {
        type: new sequelize_1.DataTypes.STRING
    }
});
