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
            try {
                let result = yield asignacion_1.Detalle_asig.update(params, {
                    where: {
                        [sequelize_1.Op.and]: [
                            { id: params.id }
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
            catch (error) {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error en actualizacion'
                });
            }
        });
    }
    /*static async update_ren(req: Request, res: Response){
        let params = req.body;
        const { id = 1, ren = 0 } = req.query;
        try{
            let buscar_cab = await Asignacion.findOne({ where: { cod_asig: id }});
            if(buscar_cab){
                const [art, alma] = await Promise.all([
                    Articulo.findOne({ where: { cod_art: params.cod_art }}),
                    Articulo.findOne({ where: { cod_alm: params.cod_alm }}),
                ]);
                if(!art){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo de articulo no existe',
                    });
                }
                if(!alma){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo del almacem no existe',
                    });
                }
                let result = await Detalle_asig.update(params,{
                    where: {
                        [Op.and]: [
                            {cod_asig: id},
                            {reg_asig: ren}
                        ]
                    }
                });
                if(result){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    });
                } else {
                    console.log('error');
                    return res.status(400).send({
                        status: 'error',
                        mensaje: 'Problemas al actualizar'
                    });
                }
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'entrada no encontrado',
                });
            }
            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error en actualizacion'
            });
        }
    }*/
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let resul = yield asignacion_1.Detalle_asig.findOne({ where: { id: id } });
                if (!resul) {
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'No se encontro registro a eliminar'
                    });
                }
                let resp = yield asignacion_1.Detalle_asig.destroy({ where: { id: id } });
                if (resp) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha eliminado correctamente',
                        resul
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
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cod = req.params.id;
            try {
                let buscar_deta = yield asignacion_1.Detalle_asig.findAll({ where: { cod_asig: cod } });
                return res.status(200).send({
                    status: 'success',
                    buscar_deta
                });
            }
            catch (error) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al listar detalles'
                });
            }
        });
    }
    static detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_asig = req.params.cod_asig;
            let id_reglon = req.params.cod_renglon;
            try {
                let buscar_deta = yield asignacion_1.Detalle_asig.findOne({ where: { cod_asig: id_asig, reg_asig: id_reglon } });
                return res.status(200).send({
                    status: 'success',
                    buscar_deta
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
    static detailId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let buscar_deta = yield asignacion_1.Detalle_asig.findOne({ where: { id: id } });
                return res.status(200).send({
                    status: 'success',
                    buscar_deta
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
exports.default = Detalle_asigController;
