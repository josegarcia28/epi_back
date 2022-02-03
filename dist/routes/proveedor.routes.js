"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const proveedor_1 = __importDefault(require("../controller/proveedor"));
const routerProveedor = (0, express_1.Router)();
// Proveedor
routerProveedor.post('/api/proveedor/new', [
    (0, express_validator_1.check)('cif_pro', 'Falta el CIF de la empresa').notEmpty(),
    (0, express_validator_1.check)('nombre', 'Falta el nombre de la empresa').notEmpty(),
    (0, express_validator_1.check)('descripcion', 'Falta el descripcion').notEmpty(),
    (0, express_validator_1.check)('direccion', 'Falta el direccion proveedor').notEmpty(),
    validar_campo_1.default.Campo,
], proveedor_1.default.save);
routerProveedor.put('/api/proveedor/:id', proveedor_1.default.update);
routerProveedor.get('/api/proveedor/list', proveedor_1.default.list);
routerProveedor.get('/api/proveedor/:id', proveedor_1.default.detail);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
exports.default = routerProveedor;
