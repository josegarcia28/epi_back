import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import AsignacionController from '../controller/asignacion';
import validarJwt from '../middlewares/validar-jwt';

const routerAsignacion = Router();

// Asignacion
routerAsignacion.post('/api/asignacion/new', 
    [
        check('cod_asig', 'Falta el cod_asig').notEmpty(),
        check('fecha', 'Falta el fecha').notEmpty(),
        check('responsable', 'Falta el responsable').notEmpty(),
        check('descripcion', 'Falta el descripcion').notEmpty(),
        Validar.Campo,
    ],
    AsignacionController.save
); 
routerAsignacion.put('/api/asignacion/:id', AsignacionController.update);
routerAsignacion.get('/api/asignacion/list',AsignacionController.list); 
routerAsignacion.get('/api/asignacion/:id',AsignacionController.detail); 
routerAsignacion.get('/api/asignacion/infoAsigEmple/:id',AsignacionController.infoEmpleAsig); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);

export default routerAsignacion;