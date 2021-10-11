import { DataTypes } from 'sequelize';
import { db } from '../bd/bd';


const Tipo_art = db.define('tipo_arts',{
    cod_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      }, 
    nombre: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    /*createdAt: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: new DataTypes.DATE,
        allowNull: false,
    },*/
});
/*console.log(Tipo_art === db.models.Tipo_art); // true
(async () => {
    await db.sync({ force: false, alter: false});
    // Code here
  })();*/

export default Tipo_art;
