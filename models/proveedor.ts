import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Proveedor = db.define('proveedor',{
    cif_pro: {
        type: DataTypes.STRING(30),
        primaryKey: true,
      }, 
    nombre: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING
    },
    direccion: {
        type: new DataTypes.STRING
    }
});