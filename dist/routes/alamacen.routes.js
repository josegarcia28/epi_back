"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const almacen_1 = __importDefault(require("../controller/almacen"));
const routerAlmacen = (0, express_1.Router)();
// Almacen
routerAlmacen.post('/api/almacen/new', [
    (0, express_validator_1.check)('cod_alm', 'Falta el cod_alm').notEmpty(),
    (0, express_validator_1.check)('nombre', 'Falta el nombre').notEmpty(),
    (0, express_validator_1.check)('ubicacion', 'Falta el ubicacion').notEmpty(),
    validar_campo_1.default.Campo,
], almacen_1.default.save);
routerAlmacen.get('/api/Almacen/list', almacen_1.default.list);
routerAlmacen.get('/api/Almacen/:id', almacen_1.default.detail);
routerAlmacen.put('/api/Almacen/:id', almacen_1.default.update);
//router.delete('/Almacen/:id', AlmacenController.delete);
exports.default = routerAlmacen;
