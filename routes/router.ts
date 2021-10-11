import { Router, Request, Response } from 'express';
//import EmpleadoController from '../controller/empleado';
import ArticuloController from '../controller/articulo';
import Tipo_artController from '../controller/tipo_art';
//import ResponsableController from '../controller/responsable';
/*import EntradaController from '../controller/entrada';
import ResponsableController from '../controller/responsable';*/

const router = Router();
// empleado
/*router.get('/empleado/list',EmpleadoController.list); 
router.post('/empleado/new',EmpleadoController.save); 
router.get('/empleado/:id',EmpleadoController.detail); 
router.put('/empleado/:id', EmpleadoController.update);
router.delete('/empleado/:id', EmpleadoController.delete);*/

// Articulo
//router.get('/articulo/list',ArticuloController.list); 
router.post('/articulo/new',ArticuloController.save); 
//router.get('/articulo/:id',ArticuloController.detail); 
//router.put('/articulo/:id', ArticuloController.update);
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
router.delete('/tipo_art/:id', Tipo_artController.delete);

/*// entrada
router.get('/tipo_art/list',Tipo_artController.list); 
router.post('/tipo_art/new',Tipo_artController.save); 
router.get('/tipo_art/:id',Tipo_artController.detail); 
router.put('/tipo_art/:id', Tipo_artController.update);
router.delete('/tipo_art/:id', Tipo_artController.delete);

// tipo_art
router.get('/tipo_art/list',Tipo_artController.list); 
router.post('/tipo_art/new',Tipo_artController.save); 
router.get('/tipo_art/:id',Tipo_artController.detail); 
router.put('/tipo_art/:id', Tipo_artController.update);
router.delete('/tipo_art/:id', Tipo_artController.delete);
*/

export default router;