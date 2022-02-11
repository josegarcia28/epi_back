import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import ArticuloController from '../controller/articulo';

const routerArticulo = Router();


// Articulo
routerArticulo.post('/api/articulo/new', 
    [
        check('cod_art', 'Falta el cod_art').notEmpty(),
        check('cod_tipo', 'Falta el cod_tipo').notEmpty(),
        check('nombre', 'Falta el nombre').notEmpty(),
        check('descripcion', 'Falta el descripcion').notEmpty(),
        check('talla', 'Falta el talla').notEmpty(),
        check('color', 'Falta el color').notEmpty(),
        Validar.Campo,
    ],
    ArticuloController.save
); 
routerArticulo.get('/api/articulo/list',ArticuloController.list); 
routerArticulo.get('/api/articulo/:id',ArticuloController.detail); 
routerArticulo.get('/api/articulo/stock/',ArticuloController.actualizarStock); 
routerArticulo.put('/api/articulo/:id', ArticuloController.update);
//router.delete('/articulo/:id', ArticuloController.delete);

export default routerArticulo;