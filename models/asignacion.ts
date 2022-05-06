import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../bd/bd';
import { Almacen } from './almacen';
import { Articulo } from './articulo';
import { Empleado } from './empleado';


 export const Asignacion = db.define('asignacion',{
    cod_asig: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    responsable: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cod_emp: {
        type: DataTypes.STRING(6),
        allowNull: false,
    }
});

export const Detalle_asig = db.define('detalle_asig',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        cod_alm: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
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

Asignacion.belongsTo(Empleado, {foreignKey: 'cod_emp'});
Empleado.hasMany(Asignacion, { foreignKey: 'cod_emp'});

Detalle_asig.belongsTo(Articulo, {foreignKey: 'cod_art'});
Articulo.hasMany(Detalle_asig, { foreignKey: 'cod_art'});
Detalle_asig.belongsTo(Almacen, {foreignKey: 'cod_alm'});
Almacen.hasMany(Detalle_asig, { foreignKey: 'cod_alm'});

