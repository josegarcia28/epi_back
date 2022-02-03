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
    apellido: {
        type: DataTypes.STRING(100),
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
    img: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
});