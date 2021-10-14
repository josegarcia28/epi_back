"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import EmpleadoController from '../controller/empleado';
const articulo_1 = __importDefault(require("../controller/articulo"));
const tipo_art_1 = __importDefault(require("../controller/tipo_art"));
//import ResponsableController from '../controller/responsable';
/*import EntradaController from '../controller/entrada';
import ResponsableController from '../controller/responsable';*/
const router = (0, express_1.Router)();
// empleado
/*router.get('/empleado/list',EmpleadoController.list);
router.post('/empleado/new',EmpleadoController.save);
router.get('/empleado/:id',EmpleadoController.detail);
router.put('/empleado/:id', EmpleadoController.update);
router.delete('/empleado/:id', EmpleadoController.delete);*/
// Articulo
//router.get('/articulo/list',ArticuloController.list); 
router.post('/articulo/new', articulo_1.default.save);
router.get('/articulo/:id', articulo_1.default.detail);
//router.put('/articulo/:id', ArticuloController.update);
//router.delete('/articulo/:id', ArticuloController.delete);
// responsable
/*router.get('/responsable/list',ResponsableController.list);
router.post('/responsable/new',ResponsableController.save);
router.get('/responsable/:id',ResponsableController.detail);
router.put('/responsable/:id', ResponsableController.update);
router.delete('/responsable/:id', ResponsableController.delete);*/
// tipo_art
router.get('/tipo_art/list', tipo_art_1.default.list);
router.post('/tipo_art/new', tipo_art_1.default.save);
router.get('/tipo_art/:id', tipo_art_1.default.detail);
router.put('/tipo_art/:id', tipo_art_1.default.update);
router.delete('/tipo_art/:id', tipo_art_1.default.delete);
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
exports.default = router;
