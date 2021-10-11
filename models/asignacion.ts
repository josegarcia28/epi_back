import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Asignacion = db.define('asignacion',{
    cod_asig: {
        type: DataTypes.STRING(6),
        primaryKey: true,
      }, 
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Responsable: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
