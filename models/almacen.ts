import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Almacen = db.define('Almacen',{
    cod_alm: {
        type: DataTypes.STRING(6),
        primaryKey: true,
      }, 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
    
});


