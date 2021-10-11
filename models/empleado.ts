import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


export const Empleado = db.define('Empleado',{
    cod_emp: {
        type: DataTypes.STRING(30),
        primaryKey: true,
      }, 
    nombre: {
        type: new DataTypes.STRING(30),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(30),
        allowNull: false,
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
    }
});