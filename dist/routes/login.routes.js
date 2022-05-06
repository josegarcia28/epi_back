"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_1 = __importDefault(require("../controller/login"));
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const routerLogin = (0, express_1.Router)();
routerLogin.post('/api/login/google', [
    (0, express_validator_1.check)('token', 'Falta el token de google').notEmpty(),
    validar_campo_1.default.Campo,
], login_1.default.SignIn);
routerLogin.post('/api/login', [
    (0, express_validator_1.check)('email', 'Falta el email').notEmpty(),
    (0, express_validator_1.check)('password', 'Falta el password').notEmpty(),
    validar_campo_1.default.Campo,
], login_1.default.login);
routerLogin.get('/api/login/renew', validar_jwt_1.default.Campo, login_1.default.renewToken);
exports.default = routerLogin;
