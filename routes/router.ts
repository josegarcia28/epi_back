import { Router} from 'express';
import EmpleadoController from '../controller/empleado';
import ArticuloController from '../controller/articulo';
import Tipo_artController from '../controller/tipo_art';
import AsignacionController from '../controller/asignacion';
import Detalle_asigController from '../controller/detalle_asig';


const router = Router();
// empleado
router.get('/empleado/list',EmpleadoController.list); 
router.post('/empleado/new',EmpleadoController.save); 
router.get('/empleado/:id',EmpleadoController.detail); 
router.put('/empleado/:id', EmpleadoController.update);
//router.delete('/empleado/:id', EmpleadoController.delete);

// Articulo
router.get('/articulo/list',ArticuloController.list); 
router.post('/articulo/new',ArticuloController.save); 
router.get('/articulo/:id',ArticuloController.detail); 
router.put('/articulo/:id', ArticuloController.update);
//router.delete('/articulo/:id', ArticuloController.delete);

// responsable
/*router.get('/responsable/list',ResponsableController.list); 
router.post('/responsable/new',ResponsableController.save); 
router.get('/responsable/:id',ResponsableController.detail); 
router.put('/responsable/:id', ResponsableController.update);
router.delete('/responsable/:id', ResponsableController.delete);*/

// tipo_art
router.get('/tipo_art/list',Tipo_artController.list); 
router.post('/tipo_art/new',Tipo_artController.save); 
router.get('/tipo_art/:id',Tipo_artController.detail); 
router.put('/tipo_art/:id', Tipo_artController.update);
//router.delete('/tipo_art/:id', Tipo_artController.delete);

// Asignacion
router.post('/asignacion/new',AsignacionController.save); 
router.put('/asignacion/:id', AsignacionController.update);
router.get('/asignacion/list',AsignacionController.list); 
router.get('/asignacion/:id',AsignacionController.detail); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);

// detalle de asignacion
router.post('/detalle_asig/new',Detalle_asigController.save); 
router.put('/detalle_asig/ren', Detalle_asigController.update_ren);
//router.get('/tipo_art/list',Tipo_artController.list); 
//router.get('/tipo_art/:id',Tipo_artController.detail); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);

export default router;