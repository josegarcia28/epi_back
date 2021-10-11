"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Articulo = bd_1.db.define('Articulo', {
    cod_art: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    cod_tipo: {
        type: new sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    talla: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
