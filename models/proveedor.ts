import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Proveedor = db.define('Proveedor',{
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
    Direccion: {
        type: new DataTypes.STRING
    }
});