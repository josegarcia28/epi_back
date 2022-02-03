import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Usuario = db.define('Usuario',{
    uid: {
        type: DataTypes.STRING(100),
        primaryKey: true,
      }, 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(120),
        allowNull: true,
    }
    
});

