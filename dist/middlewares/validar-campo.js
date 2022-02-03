"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Validar {
    static Campo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let errores = (0, express_validator_1.validationResult)(req);
            if (!errores.isEmpty()) {
                console.log(errores);
                return res.status(400).send({
                    status: 'Algunos datos en blanco',
                    error: errores.mapped()
                });
            }
            next();
        });
    }
}
exports.default = Validar;
