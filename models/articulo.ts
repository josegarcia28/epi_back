import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';
import Tipo_art from './tipo_art';


export const Articulo = db.define('Articulo',{
    cod_art: {
        type: DataTypes.STRING(6),
        primaryKey: true,
      }, 
    cod_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    talla: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(120),
        allowNull: false,
    }
});
Articulo.belongsTo(Tipo_art);