"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_entra = exports.Entrada = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const almacen_1 = require("./almacen");
const articulo_1 = require("./articulo");
const proveedor_1 = require("./proveedor");
exports.Entrada = bd_1.db.define('entrada', {
    cod_entra: {
        type: sequelize_1.DataTypes.STRING(6),
        primaryKey: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    responsable: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cif_pro: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    }
});
exports.Entrada.belongsTo(proveedor_1.Proveedor, { foreignKey: 'cif_pro' });
proveedor_1.Proveedor.hasMany(exports.Entrada, { foreignKey: 'cif_pro' });
exports.Detalle_entra = bd_1.db.define('detalle_entra', {
    reg_entra: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cod_entra: {
        type: sequelize_1.DataTypes.STRING(6),
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
    cod_alm: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['reg_entra', 'cod_entra']
        }
    ]
});
exports.Detalle_entra.belongsTo(exports.Entrada, { foreignKey: 'cod_entra' });
exports.Entrada.hasMany(exports.Detalle_entra, { foreignKey: 'cod_entra' });
exports.Detalle_entra.belongsTo(articulo_1.Articulo, { foreignKey: 'cod_art' });
articulo_1.Articulo.hasMany(exports.Detalle_entra, { foreignKey: 'cod_art' });
exports.Detalle_entra.belongsTo(almacen_1.Almacen, { foreignKey: 'cod_alm' });
almacen_1.Almacen.hasMany(exports.Detalle_entra, { foreignKey: 'cod_alm' });
