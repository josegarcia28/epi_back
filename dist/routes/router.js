"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_1 = __importDefault(require("../controller/empleado"));
const articulo_1 = __importDefault(require("../controller/articulo"));
const tipo_art_1 = __importDefault(require("../controller/tipo_art"));
const asignacion_1 = __importDefault(require("../controller/asignacion"));
const detalle_asig_1 = __importDefault(require("../controller/detalle_asig"));
const router = (0, express_1.Router)();
// empleado
router.get('/empleado/list', empleado_1.default.list);
router.post('/empleado/new', empleado_1.default.save);
router.get('/empleado/:id', empleado_1.default.detail);
router.put('/empleado/:id', empleado_1.default.update);
//router.delete('/empleado/:id', EmpleadoController.delete);
// Articulo
router.get('/articulo/list', articulo_1.default.list);
router.post('/articulo/new', articulo_1.default.save);
router.get('/articulo/:id', articulo_1.default.detail);
router.put('/articulo/:id', articulo_1.default.update);
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
//router.delete('/tipo_art/:id', Tipo_artController.delete);
// Asignacion
router.post('/asignacion/new', asignacion_1.default.save);
router.put('/asignacion/:id', asignacion_1.default.update);
router.get('/asignacion/list', asignacion_1.default.list);
router.get('/asignacion/:id', asignacion_1.default.detail);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
// detalle de asignacion
router.post('/detalle_asig/new', detalle_asig_1.default.save);
router.put('/detalle_asig/ren', detalle_asig_1.default.update_ren);
//router.get('/tipo_art/list',Tipo_artController.list); 
//router.get('/tipo_art/:id',Tipo_artController.detail); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);
exports.default = router;
