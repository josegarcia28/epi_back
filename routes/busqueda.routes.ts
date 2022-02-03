import { Router} from 'express';
import { check } from 'express-validator';
import BusquedaController from '../controller/busqueda';
import  Validar  from '../middlewares/validar-campo';

const routerBusqueda = Router();

//rutas
routerBusqueda.get('/api/busqueda/:tabla/:busqueda', BusquedaController.getTodo); 

export default routerBusqueda;