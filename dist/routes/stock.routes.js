"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campo_1 = __importDefault(require("../middlewares/validar-campo"));
const stock_1 = __importDefault(require("../controller/stock"));
const routerStock = (0, express_1.Router)();
// Stock
routerStock.post('/api/stock/new', [
    (0, express_validator_1.check)('cod_art', 'Falta el cod_art').notEmpty(),
    (0, express_validator_1.check)('cod_alm', 'Falta el cod_alm').notEmpty(),
    (0, express_validator_1.check)('cantidad', 'Falta el cantidad').notEmpty(),
    validar_campo_1.default.Campo,
], stock_1.default.save);
routerStock.get('/api/stock/list', stock_1.default.list);
routerStock.get('/api/stock/:id', stock_1.default.detail);
routerStock.put('/api/stock', stock_1.default.update);
//router.delete('/Stock/:id', StockController.delete);
exports.default = routerStock;
