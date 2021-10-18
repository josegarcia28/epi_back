import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Responsable = db.define('Responsable',{
    cod_resp: {
        type: DataTypes.STRING(30),
        primaryKey: true,
      }, 
    nombre: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING
    }
});