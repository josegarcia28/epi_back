"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const tipo_art_1 = __importDefault(require("./tipo_art"));
exports.Articulo = bd_1.db.define('Articulo', {
    cod_art: {
        type: sequelize_1.DataTypes.STRING(6),
        primaryKey: true,
    },
    cod_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    talla: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false,
    }
});
exports.Articulo.belongsTo(tipo_art_1.default);
