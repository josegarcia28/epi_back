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
const asignacion_1 = require("../models/asignacion");
class Detalle_asigController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                let result = yield asignacion_1.Detalle_asig.create(params);
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
                let buscar_cab = yield asignacion_1.Asignacion.findOne({ where: { cod_asig: id } });
                if (buscar_cab) {
                    let result = yield asignacion_1.Detalle_asig.update(params, {
                        where: {
                            [sequelize_1.Op.and]: [
                                { cod_asig: id },
                                { reg_asig: ren }
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
}
exports.default = Detalle_asigController;
