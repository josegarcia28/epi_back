import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import Detalle_entraController from '../controller/detalle_entrada';

const routerDetalle_entra = Router();

// detalle de asignacion
routerDetalle_entra.post('/api/detalle_entra/new', 
    [
        check('reg_entra', 'Falta el reg_entra').notEmpty(),
        check('cod_entra', 'Falta el cod_entra').notEmpty(),
        check('cod_art', 'Falta el cod_art').notEmpty(),
        check('cantidad', 'Falta el cantidad').notEmpty(),
        check('cod_alm', 'Falta el cod_alm').notEmpty(),
        Validar.Campo,
    ],
    Detalle_entraController.save
); 
routerDetalle_entra.put('/api/detalle_entra', Detalle_entraController.update_ren);
routerDetalle_entra.get('/api/detalle_entra/list/:id',Detalle_entraController.list); 
routerDetalle_entra.get('/api/detalle_entra/:id',Detalle_entraController.detailId); 
//routerDetalle_entra.get('/tipo_art/:id',Tipo_artController.detail); 
routerDetalle_entra.delete('/api/detalle_entra/:id', Detalle_entraController.delete);

export default routerDetalle_entra;