"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const subir_1 = __importDefault(require("../controller/subir"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const routerSubir = (0, express_1.Router)();
routerSubir.use((0, express_fileupload_1.default)());
routerSubir.put('/api/subir/:tipo/:id', validar_jwt_1.default.Campo, subir_1.default.subir);
routerSubir.get('/api/subir/:tipo/:foto', subir_1.default.retornaImage);
exports.default = routerSubir;
