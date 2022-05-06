import Server from './server/server';
import { db } from './bd/bd'
import cors from 'cors';
import routerEmpleado from './routes/empleado.routes';
import routerArticulo from './routes/articulo.routes';
import routerAsignacion from './routes/asignacion.routes';
import routerTipo_art from './routes/tipo_art.routes';
import routerDetalle_asig from './routes/detalle_asig.routes';
import routerLogin from './routes/login.routes';
import routerBusqueda from './routes/busqueda.routes';
import routerAlmacen from './routes/alamacen.routes';
import routerStock from './routes/stock.routes';
import routerSubir from './routes/subir.routes';
import routerCompra from './routes/entrada.routes';
import routerProveedor from './routes/proveedor.routes';
import routerDetalle_entra from './routes/detalle_entra.routes';
import routerUsuario from './routes/usuario.routes';


const server = Server.init();

// Configurar CORS
server.app.use( cors() );

server.app.use((req: any, res: any, next) => {
    /*res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();*/
    // falta probar estos para cuando el token expire
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

// Rutas
server.app.use( routerLogin );
server.app.use( routerUsuario );
server.app.use( routerEmpleado );
server.app.use( routerArticulo );
server.app.use( routerAsignacion );
server.app.use( routerTipo_art );
server.app.use( routerDetalle_asig );
server.app.use( routerBusqueda );
server.app.use( routerAlmacen );
server.app.use( routerStock );
server.app.use( routerSubir );
server.app.use( routerCompra );
server.app.use( routerProveedor );
server.app.use( routerDetalle_entra );



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