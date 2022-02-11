import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';
import { Almacen } from './almacen';
import { Articulo } from './articulo';


export const Stock = db.define('Stock',{
    cod_stock: {
        type: DataTypes.STRING(11),
        primaryKey: true,
    }, 
    cod_art: {
        type: DataTypes.STRING(6),
        allowNull: false,
      }, 
    cod_alm: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
});
Stock.belongsTo(Articulo, {foreignKey: 'cod_art'});
Articulo.hasMany(Stock, { foreignKey: 'cod_art'});

Stock.belongsTo(Almacen, {foreignKey: 'cod_alm'});
Almacen.hasMany(Stock, { foreignKey: 'cod_alm'});
