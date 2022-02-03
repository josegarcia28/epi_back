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
const sequelize_1 = require("sequelize");
const empleado_1 = require("../models/empleado");
const articulo_1 = require("../models/articulo");
const proveedor_1 = require("../models/proveedor");
class BusquedaController {
    static getTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //var params = req.body;
            var tabla = req.params.tabla;
            var busqueda = req.params.busqueda;
            let data = [];
            switch (tabla) {
                case 'empleado':
                    data = yield empleado_1.Empleado.findAll({
                        where: {
                            nombre: {
                                [sequelize_1.Op.like]: `%${busqueda}%`
                            }
                        }
                    });
                    break;
                case 'articulo':
                    data = yield articulo_1.Articulo.findAll({
                        where: {
                            nombre: {
                                [sequelize_1.Op.like]: `%${busqueda}%`
                            }
                        }
                    });
                    break;
                case 'proveedor':
                    data = yield proveedor_1.Proveedor.findAll({
                        where: {
                            nombre: {
                                [sequelize_1.Op.like]: `%${busqueda}%`
                            }
                        }
                    });
                    break;
                default:
                    return res.status(400).json({
                        ok: false,
                        msg: 'La tabla tiene que ser empleado/articulo/proveedor'
                    });
            }
            try {
                if (data) {
                    return res.status(200).send({
                        status: 'success',
                        data
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error de creacion'
                });
            }
        });
    }
}
exports.default = BusquedaController;
