"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busqueda_1 = __importDefault(require("../controller/busqueda"));
const routerBusqueda = (0, express_1.Router)();
//rutas
routerBusqueda.get('/api/busqueda/:tabla/:busqueda', busqueda_1.default.getTodo);
exports.default = routerBusqueda;
