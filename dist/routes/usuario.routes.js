"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = __importDefault(require("../controller/usuario"));
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const routerUsuario = (0, express_1.Router)();
routerUsuario.post('/api/usuario/new', [
    (0, express_validator_1.check)('email', 'Falta el email').notEmpty(),
    (0, express_validator_1.check)('password', 'Falta el password').notEmpty(),
    validar_campo_1.default.Campo,
], usuario_1.default.save);
//routerLogin.get('/api/login/renew',LoginController.renewToken
routerUsuario.put('/api/usuario/update', validar_jwt_1.default.Campo, usuario_1.default.update);
exports.default = routerUsuario;
