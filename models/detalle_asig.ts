import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';
import { Articulo } from './articulo';
import { Asignacion } from './asignacion';
import { Empleado } from './empleado';


export const Detalle_asig = db.define('detalle_asig',{
    reg_asig: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    cod_asig: {
        type: DataTypes.INTEGER,
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
});
Detalle_asig.belongsTo(Articulo);
Detalle_asig.belongsTo(Asignacion);
Detalle_asig.belongsTo(Empleado);
