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
const entrada_1 = require("../models/entrada");
class Detalle_entraController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                let result = yield entrada_1.Detalle_entra.create(params);
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
    static update_ren(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            const { id = 1, ren = 0 } = req.query;
            try {
                let buscar_cab = yield entrada_1.Entrada.findOne({ where: { cod_entra: id } });
                if (buscar_cab) {
                    let result = yield entrada_1.Detalle_entra.update(params, {
                        where: {
                            [sequelize_1.Op.and]: [
                                { cod_entra: id },
                                { reg_entra: ren }
                            ]
                        }
                    });
                    if (result) {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'se ha actualizado correctamente',
                        });
                    }
                    else {
                        console.log('error');
                        return res.status(400).send({
                            status: 'error',
                            mensaje: 'Problemas al actualizar'
                        });
                    }
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'entrada no encontrado',
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
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0 } = req.query;
            try {
                const [detalle_entra, total] = yield Promise.all([
                    entrada_1.Detalle_entra.findAll({
                        offset: Number(desde),
                        limit: Number(limite),
                        include: entrada_1.Detalle_entra
                    }),
                    entrada_1.Detalle_entra.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    detalle_entra
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
exports.default = Detalle_entraController;
