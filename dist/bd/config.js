"use strict";
/*import mysql = require('mysql');

export default class MySql {
    private static _instance: MySql;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'azurian_prueba',
            port: 3306
         });
         this.conectarBD();
       
    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    static execQuery( query: string, callback: Function){
        
        this.instance.cnn.query(query, (err, res: Object[], fil) => {
            if(err){
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if(res.length == 0){
                callback('El registro solicitado no existe');
            } else {
                callback(err, res)
            }


        });
    }

    private conectarBD(){
        this.cnn.connect( (err: mysql.MysqlError) => {
            if(err){
               console.log(err.message);
               return
            }
            this.conectado = true;
            console.log('Base de datos conectada');
         });
    }
}
*/
