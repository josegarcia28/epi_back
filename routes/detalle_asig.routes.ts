import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import Detalle_asigController from '../controller/detalle_asig';
import validarJwt from '../middlewares/validar-jwt';

const routerDetalle_asig = Router();

// detalle de asignacion
routerDetalle_asig.post('/api/detalle_asig/new', 
    [
        check('reg_asig', 'Falta el reg_asig').notEmpty(),
        check('cod_asig', 'Falta el cod_asig').notEmpty(),
        check('cod_art', 'Falta el cod_art').notEmpty(),
        check('cod_alm', 'Falta el cod_alm').notEmpty(),
        check('cantidad', 'Falta el cantidad').notEmpty(),
        Validar.Campo
    ],
    Detalle_asigController.save
); 
routerDetalle_asig.put('/api/detalle_asig', Detalle_asigController.update_ren);
routerDetalle_asig.get('/api/detalle_asig/list/:id',Detalle_asigController.list); 
//router.get('/tipo_art/:id',Tipo_artController.detail); 
routerDetalle_asig.delete('/api/detalle_asig/:id', validarJwt.Campo, Detalle_asigController.delete);

export default routerDetalle_asig;