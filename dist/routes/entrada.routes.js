"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const entrada_1 = __importDefault(require("../controller/entrada"));
const routerCompra = (0, express_1.Router)();
// Compra
routerCompra.post('/api/compra/new', [
    (0, express_validator_1.check)('fecha', 'Falta el fecha').notEmpty(),
    (0, express_validator_1.check)('responsable', 'Falta el responsable').notEmpty(),
    (0, express_validator_1.check)('descripcion', 'Falta el descripcion').notEmpty(),
    (0, express_validator_1.check)('cif_pro', 'Falta el codigo proveedor').notEmpty(),
    validar_campo_1.default.Campo,
], entrada_1.default.save);
routerCompra.put('/api/compra/:id', entrada_1.default.update);
routerCompra.get('/api/compra/list', entrada_1.default.list);
routerCompra.get('/api/compra/:id', entrada_1.default.detail);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
exports.default = routerCompra;
