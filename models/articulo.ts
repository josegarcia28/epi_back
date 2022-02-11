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
    },
    s_inicial: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    s_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    
});

Articulo.belongsTo(Tipo_art, {foreignKey: 'cod_tipo'});
Tipo_art.hasMany(Articulo, { foreignKey: 'cod_tipo'});
