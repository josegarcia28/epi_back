"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_asig = exports.Asignacion = void 0;
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const almacen_1 = require("./almacen");
const articulo_1 = require("./articulo");
const empleado_1 = require("./empleado");
exports.Asignacion = bd_1.db.define('asignacion', {
    cod_asig: {
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
    cod_emp: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
    }
});
exports.Detalle_asig = bd_1.db.define('detalle_asig', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    reg_asig: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cod_asig: {
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
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['reg_asig', 'cod_asig']
        }
    ]
});
exports.Detalle_asig.belongsTo(exports.Asignacion, { foreignKey: 'cod_asig' });
exports.Asignacion.hasMany(exports.Detalle_asig, { foreignKey: 'cod_asig' });
exports.Asignacion.belongsTo(empleado_1.Empleado, { foreignKey: 'cod_emp' });
empleado_1.Empleado.hasMany(exports.Asignacion, { foreignKey: 'cod_emp' });
exports.Detalle_asig.belongsTo(articulo_1.Articulo, { foreignKey: 'cod_art' });
articulo_1.Articulo.hasMany(exports.Detalle_asig, { foreignKey: 'cod_art' });
exports.Detalle_asig.belongsTo(almacen_1.Almacen, { foreignKey: 'cod_alm' });
almacen_1.Almacen.hasMany(exports.Detalle_asig, { foreignKey: 'cod_alm' });
