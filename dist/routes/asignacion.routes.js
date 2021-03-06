"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const asignacion_1 = __importDefault(require("../controller/asignacion"));
const routerAsignacion = (0, express_1.Router)();
// Asignacion
routerAsignacion.post('/api/asignacion/new', [
    (0, express_validator_1.check)('cod_asig', 'Falta el cod_asig').notEmpty(),
    (0, express_validator_1.check)('fecha', 'Falta el fecha').notEmpty(),
    (0, express_validator_1.check)('responsable', 'Falta el responsable').notEmpty(),
    (0, express_validator_1.check)('descripcion', 'Falta el descripcion').notEmpty(),
    validar_campo_1.default.Campo,
], asignacion_1.default.save);
routerAsignacion.put('/api/asignacion/:id', asignacion_1.default.update);
routerAsignacion.get('/api/asignacion/list', asignacion_1.default.list);
routerAsignacion.get('/api/asignacion/:id', asignacion_1.default.detail);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
exports.default = routerAsignacion;
