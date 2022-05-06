import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';
import { Almacen } from './almacen';
import { Articulo } from './articulo';
import { Proveedor } from './proveedor';


 export const Entrada = db.define('entrada',{
    cod_entra: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    responsable: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cif_pro: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
});

Entrada.belongsTo(Proveedor, {foreignKey: 'cif_pro'});
Proveedor.hasMany(Entrada, { foreignKey: 'cif_pro'});

export const Detalle_entra = db.define('detalle_entra',{
        reg_entra: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        cod_entra: {
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
        cod_alm: {
            type: DataTypes.STRING(6),
            allowNull: false,
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['reg_entra', 'cod_entra']
            }
        ]
    }
);

Detalle_entra.belongsTo(Entrada, {foreignKey: 'cod_entra'});
Entrada.hasMany(Detalle_entra, { foreignKey: 'cod_entra'});

Detalle_entra.belongsTo(Articulo, {foreignKey: 'cod_art'});
Articulo.hasMany(Detalle_entra, { foreignKey: 'cod_art'});

Detalle_entra.belongsTo(Almacen, {foreignKey: 'cod_alm'});
Almacen.hasMany(Detalle_entra, { foreignKey: 'cod_alm'});