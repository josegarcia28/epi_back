import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


const Tipo_art = db.define('tipo_arts',{
    cod_tipo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});


export default Tipo_art;
