import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import AlmacenController from '../controller/almacen';

const routerAlmacen = Router();


// Almacen
routerAlmacen.post('/api/almacen/new', 
    [
        check('cod_alm', 'Falta el cod_alm').notEmpty(),
        check('nombre', 'Falta el nombre').notEmpty(),
        check('ubicacion', 'Falta el ubicacion').notEmpty(),
        Validar.Campo,
    ],
    AlmacenController.save
); 
routerAlmacen.get('/api/Almacen/list',AlmacenController.list); 
routerAlmacen.get('/api/Almacen/:id',AlmacenController.detail); 
routerAlmacen.put('/api/Almacen/:id', AlmacenController.update);
//router.delete('/Almacen/:id', AlmacenController.delete);

export default routerAlmacen;