"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const tipo_art_1 = __importDefault(require("../controller/tipo_art"));
const asignacion_1 = __importDefault(require("../controller/asignacion"));
const detalle_asig_1 = __importDefault(require("../controller/detalle_asig"));
const router = (0, express_1.Router)();
// responsable
/*router.get('/responsable/list',ResponsableController.list);
router.post('/responsable/new',ResponsableController.save);
router.get('/responsable/:id',ResponsableController.detail);
router.put('/responsable/:id', ResponsableController.update);
router.delete('/responsable/:id', ResponsableController.delete);*/
// tipo_art
router.post('/tipo_art/new', [
    (0, express_validator_1.check)('cod_tipo', 'Falta el cod_tipo').notEmpty(),
    (0, express_validator_1.check)('nombre', 'Falta el nombre').notEmpty(),
    validar_campo_1.default.Campo,
], tipo_art_1.default.save);
router.get('/tipo_art/list', tipo_art_1.default.list);
router.get('/tipo_art/:id', tipo_art_1.default.detail);
router.put('/tipo_art/:id', tipo_art_1.default.update);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
// Asignacion
router.post('/asignacion/new', [
    (0, express_validator_1.check)('cod_asig', 'Falta el cod_asig').notEmpty(),
    (0, express_validator_1.check)('fecha', 'Falta el fecha').notEmpty(),
    (0, express_validator_1.check)('responsable', 'Falta el responsable').notEmpty(),
    (0, express_validator_1.check)('descripcion', 'Falta el descripcion').notEmpty(),
    validar_campo_1.default.Campo,
], asignacion_1.default.save);
router.put('/asignacion/:id', asignacion_1.default.update);
router.get('/asignacion/list', asignacion_1.default.list);
router.get('/asignacion/:id', asignacion_1.default.detail);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
// detalle de asignacion
router.post('/detalle_asig/new', [
    (0, express_validator_1.check)('reg_asig', 'Falta el reg_asig').notEmpty(),
    (0, express_validator_1.check)('cod_asig', 'Falta el cod_asig').notEmpty(),
    (0, express_validator_1.check)('cod_art', 'Falta el cod_art').notEmpty(),
    (0, express_validator_1.check)('cantidad', 'Falta el cantidad').notEmpty(),
    (0, express_validator_1.check)('cod_emp', 'Falta el cod_emp').notEmpty(),
    validar_campo_1.default.Campo,
], detalle_asig_1.default.save);
router.put('/detalle_asig/ren', detalle_asig_1.default.update_ren);
//router.get('/tipo_art/list',Tipo_artController.list); 
//router.get('/tipo_art/:id',Tipo_artController.detail); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);
exports.default = router;
