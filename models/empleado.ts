import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Empleado = db.define('empleado',{
    cod_emp: {
        type: DataTypes.STRING(30),
        primaryKey: true,
      }, 
    nombre: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    dni: {
        type: new DataTypes.STRING(15)
    },
    estatus: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING
    },
    t_calzado: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_pantalon: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_camiseta: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_guante: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_chaleco: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_jersey: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_cazadora: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    t_buzo: {
        type: new DataTypes.STRING(5),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
});