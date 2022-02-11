"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const articulo_1 = __importDefault(require("../controller/articulo"));
const routerArticulo = (0, express_1.Router)();
// Articulo
routerArticulo.post('/api/articulo/new', [
    (0, express_validator_1.check)('cod_art', 'Falta el cod_art').notEmpty(),
    (0, express_validator_1.check)('cod_tipo', 'Falta el cod_tipo').notEmpty(),
    (0, express_validator_1.check)('nombre', 'Falta el nombre').notEmpty(),
    (0, express_validator_1.check)('descripcion', 'Falta el descripcion').notEmpty(),
    (0, express_validator_1.check)('talla', 'Falta el talla').notEmpty(),
    (0, express_validator_1.check)('color', 'Falta el color').notEmpty(),
    validar_campo_1.default.Campo,
], articulo_1.default.save);
routerArticulo.get('/api/articulo/list', articulo_1.default.list);
routerArticulo.get('/api/articulo/:id', articulo_1.default.detail);
routerArticulo.get('/api/articulo/stock/', articulo_1.default.actualizarStock);
routerArticulo.put('/api/articulo/:id', articulo_1.default.update);
//router.delete('/articulo/:id', ArticuloController.delete);
exports.default = routerArticulo;
