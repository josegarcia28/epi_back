"use strict";
/*import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';
import { Articulo } from './articulo';
import { Asignacion } from './asignacion';
import { Empleado } from './empleado';


export const Detalle_asig = db.define('detalle_asig',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reg_asig: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_asig: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        cod_art: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_emp: {
            type: DataTypes.STRING(6),
            allowNull: false,
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['reg_asig', 'cod_asig']
            }
        ]
    }
);

Detalle_asig.belongsTo(Asignacion, {foreignKey: 'cod_asig'});
Asignacion.hasMany(Detalle_asig, { foreignKey: 'cod_asig'});

Detalle_asig.belongsTo(Articulo, {foreignKey: 'cod_art'});
Articulo.hasMany(Detalle_asig, { foreignKey: 'cod_art'});

Detalle_asig.belongsTo(Empleado, {foreignKey: 'cod_emp'});
Empleado.hasMany(Detalle_asig, { foreignKey: 'cod_emp'});*/ 
