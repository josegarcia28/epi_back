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
const almacen_1 = require("../models/almacen");
class AlmacenController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                let result = yield almacen_1.Almacen.create(params);
                if (result) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        result
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
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            let id = req.params.id;
            try {
                let buscar = yield almacen_1.Almacen.update(params, { where: { cod_alm: id } });
                if (buscar) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Almacen no encontrado',
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error en actualizacion'
                });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let resul = yield almacen_1.Almacen.destroy({ where: { cod_alm: id } });
                if (resul) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha eliminado correctamente',
                        resul
                    });
                }
                else {
                    console.log('error');
                    return res.status(400).send({
                        status: 'error',
                        mensaje: 'Problemas al eliminar'
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al eliminar'
                });
            }
        });
    }
    /*attributes: [
                        
    ],*/
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0 } = req.query;
            try {
                const [almacenes, total] = yield Promise.all([
                    almacen_1.Almacen.findAll({
                        offset: Number(desde),
                        limit: Number(limite)
                    }),
                    almacen_1.Almacen.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    almacenes
                });
            }
            catch (error) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al listar'
                });
            }
        });
    }
    static detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let result = yield almacen_1.Almacen.findOne({
                    where: { cod_alm: id }
                });
                return res.status(200).send({
                    status: 'success',
                    result
                });
            }
            catch (error) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al listar'
                });
            }
        });
    }
}
exports.default = AlmacenController;
