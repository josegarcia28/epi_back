import express, { Application } from 'express';
import path = require('path');


var morgan = require('morgan');

export default class Server {
  public app: Application;
  public port: string;
  
  constructor(){
    this.port = process.env.PORT || '3900';
    this.app = express();
    this.app.use(morgan('combined'));
    this.app.use(express.json() as any);
    this.app.use(express.urlencoded({extended: false}) as any);
  }

  static init(){
    return new Server();
  }

  private publicFolder(){
    const publicPath = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicPath));
  }

  start(callback: any){
    this.app.listen(this.port,callback);
    this.publicFolder();
  }

 }

