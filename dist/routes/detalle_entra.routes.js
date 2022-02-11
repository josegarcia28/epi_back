"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const detalle_entrada_1 = __importDefault(require("../controller/detalle_entrada"));
const routerDetalle_entra = (0, express_1.Router)();
// detalle de asignacion
routerDetalle_entra.post('/api/detalle_entra/new', [
    (0, express_validator_1.check)('reg_entra', 'Falta el reg_entra').notEmpty(),
    (0, express_validator_1.check)('cod_entra', 'Falta el cod_entra').notEmpty(),
    (0, express_validator_1.check)('cod_art', 'Falta el cod_art').notEmpty(),
    (0, express_validator_1.check)('cantidad', 'Falta el cantidad').notEmpty(),
    (0, express_validator_1.check)('cod_alm', 'Falta el cod_alm').notEmpty(),
    validar_campo_1.default.Campo,
], detalle_entrada_1.default.save);
routerDetalle_entra.put('/api/detalle_entra', detalle_entrada_1.default.update_ren);
routerDetalle_entra.get('/api/detalle_entra/list/:id', detalle_entrada_1.default.list);
routerDetalle_entra.get('/api/detalle_entra/:id', detalle_entrada_1.default.detailId);
//routerDetalle_entra.get('/tipo_art/:id',Tipo_artController.detail); 
routerDetalle_entra.delete('/api/detalle_entra/:id', detalle_entrada_1.default.delete);
exports.default = routerDetalle_entra;
