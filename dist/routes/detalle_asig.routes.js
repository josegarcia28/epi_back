"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const detalle_asig_1 = __importDefault(require("../controller/detalle_asig"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const routerDetalle_asig = (0, express_1.Router)();
// detalle de asignacion
routerDetalle_asig.post('/api/detalle_asig/new', [
    (0, express_validator_1.check)('reg_asig', 'Falta el reg_asig').notEmpty(),
    (0, express_validator_1.check)('cod_asig', 'Falta el cod_asig').notEmpty(),
    (0, express_validator_1.check)('cod_art', 'Falta el cod_art').notEmpty(),
    (0, express_validator_1.check)('cod_alm', 'Falta el cod_alm').notEmpty(),
    (0, express_validator_1.check)('cantidad', 'Falta el cantidad').notEmpty(),
    validar_campo_1.default.Campo
], detalle_asig_1.default.save);
routerDetalle_asig.put('/api/detalle_asig', detalle_asig_1.default.update_ren);
routerDetalle_asig.get('/api/detalle_asig/list/:id', detalle_asig_1.default.list);
routerDetalle_asig.get('/api/detalle_asig/:id', detalle_asig_1.default.detailId);
routerDetalle_asig.delete('/api/detalle_asig/:id', validar_jwt_1.default.Campo, detalle_asig_1.default.delete);
exports.default = routerDetalle_asig;
