import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import EntradaController from '../controller/entrada';

const routerCompra = Router();

// Compra
routerCompra.post('/api/compra/new', 
    [
        check('cod_entra', 'Falta el codigo de entrada').notEmpty(),
        check('fecha', 'Falta el fecha').notEmpty(),
        check('responsable', 'Falta el responsable').notEmpty(),
        check('descripcion', 'Falta el descripcion').notEmpty(),
        check('cif_pro', 'Falta el codigo proveedor').notEmpty(),
        Validar.Campo,
    ],
    EntradaController.save
); 
routerCompra.put('/api/compra/:id', EntradaController.update);
routerCompra.get('/api/compra/list',EntradaController.list); 
routerCompra.get('/api/compra/:id',EntradaController.detail); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);

export default routerCompra;