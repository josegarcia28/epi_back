"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const almacen_1 = require("./almacen");
const articulo_1 = require("./articulo");
exports.Stock = bd_1.db.define('Stock', {
    cod_stock: {
        type: sequelize_1.DataTypes.STRING(6),
        primaryKey: true,
    },
    cod_art: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    },
    cod_alm: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.Stock.belongsTo(articulo_1.Articulo, { foreignKey: 'cod_art' });
articulo_1.Articulo.hasMany(exports.Stock, { foreignKey: 'cod_art' });
exports.Stock.belongsTo(almacen_1.Almacen, { foreignKey: 'cod_alm' });
almacen_1.Almacen.hasMany(exports.Stock, { foreignKey: 'cod_alm' });
