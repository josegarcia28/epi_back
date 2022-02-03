"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_1 = __importDefault(require("../controller/login"));
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const routerLogin = (0, express_1.Router)();
routerLogin.post('/api/login/google', [
    (0, express_validator_1.check)('token', 'Falta el token de google').notEmpty(),
    validar_campo_1.default.Campo,
], login_1.default.SignIn);
routerLogin.get('/api/login/renew', login_1.default.renewToken);
exports.default = routerLogin;
