import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Articulo = db.define('Articulo',{
    cod_art: {
        type: DataTypes.STRING,
        primaryKey: true,
      }, 
    cod_tipo: {
        type: new DataTypes.NUMBER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    talla: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: new DataTypes.STRING,
        allowNull: false,
    }
});
