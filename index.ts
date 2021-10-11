//import "reflect-metadata";
import Server from './server/server';
import router from './routes/router';
import { db } from './bd/bd'
/*import dotenv from 'dotenv';
dotenv.config();*/

const server = Server.init();

server.app.use((req: any, res: any, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.app.use(router);
server.start(()=>{
    db.authenticate().then(async() => {
        console.log("BD corriendo")
        try {
            await db.sync({force: false})
        } catch (error: any) {
            console.log(error.message)
        }
    }).catch( (e: any) => {
        console.log(e.message)
    })
});