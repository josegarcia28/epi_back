"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const tipo_art_1 = __importDefault(require("../controller/tipo_art"));
const routerTipo_art = (0, express_1.Router)();
// tipo_art
routerTipo_art.post('/api/tipo_art/new', [
    (0, express_validator_1.check)('nombre', 'Falta el nombre').notEmpty(),
    validar_campo_1.default.Campo,
], tipo_art_1.default.save);
routerTipo_art.get('/api/tipo_art/list', tipo_art_1.default.list);
routerTipo_art.get('/api/tipo_art/:id', tipo_art_1.default.detail);
routerTipo_art.put('/api/tipo_art/:id', tipo_art_1.default.update);
//router.delete('/tipo_art/:id', Tipo_artController.delete);
exports.default = routerTipo_art;
