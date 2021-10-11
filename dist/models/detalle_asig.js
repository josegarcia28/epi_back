"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_asig = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const articulo_1 = require("./articulo");
const asignacion_1 = require("./asignacion");
const empleado_1 = require("./empleado");
exports.Detalle_asig = bd_1.db.define('detalle_asig', {
    reg_asig: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cod_asig: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cod_art: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cod_emp: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    }
});
exports.Detalle_asig.belongsTo(articulo_1.Articulo);
exports.Detalle_asig.belongsTo(asignacion_1.Asignacion);
exports.Detalle_asig.belongsTo(empleado_1.Empleado);
