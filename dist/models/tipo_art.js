"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bd_1 = require("../bd/bd");
const Tipo_art = bd_1.db.define('tipo_arts', {
    cod_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING,
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
exports.default = Tipo_art;
