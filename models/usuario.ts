import { DataTypes, Model } from 'sequelize';
import { db } from '../bd/bd';
import bcrypt from 'bcryptjs';

interface IUsuario extends Model {
    uid: string;
    nombre: string;
    password: string;
    token: string;
    email: string;
    img: string;
    role: string;
    status: string;
}

export const Usuario = db.define<IUsuario>('usuario',{
    uid: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }, 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
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
})