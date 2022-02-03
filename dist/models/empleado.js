"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
exports.Empleado = bd_1.db.define('empleado', {
    cod_emp: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    t_calzado: {
        type: new sequelize_1.DataTypes.STRING(5),
        allowNull: false,
    },
    t_pantalon: {
        type: new sequelize_1.DataTypes.STRING(5),
        allowNull: false,
    },
    t_camiseta: {
        type: new sequelize_1.DataTypes.STRING(5),
        allowNull: false,
    },
    t_guante: {
        type: new sequelize_1.DataTypes.STRING(5),
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
});
