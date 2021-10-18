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
const entrada_1 = require("../models/entrada");
class EntradaController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                let nuevo = yield entrada_1.Entrada.create(params);
                if (nuevo) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        nuevo
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
                let result = yield entrada_1.Entrada.update(params, { where: { cod_entra: id } });
                if (result) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                        result
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'codigo no encontrado',
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
    /*static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await Tipo_art.destroy({where: {cod_art: id}});
            if(resul){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha eliminado correctamente',
                    resul
                });
            } else {
                console.log('error');
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Problemas al eliminar'
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al eliminar'
            });
        }

    }
    */
    static list_cab(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0 } = req.query;
            try {
                const [entra, total] = yield Promise.all([
                    entrada_1.Entrada.findAll({
                        offset: Number(desde),
                        limit: Number(limite)
                    }),
                    entrada_1.Entrada.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    entra
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
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0 } = req.query;
            try {
                const [entra, total] = yield Promise.all([
                    entrada_1.Entrada.findAll({
                        offset: Number(desde),
                        limit: Number(limite),
                        include: entrada_1.Detalle_entra
                    }),
                    entrada_1.Entrada.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    entra
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
                let result = yield entrada_1.Entrada.findOne({ where: { cod_entra: id }, include: entrada_1.Detalle_entra });
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
exports.default = EntradaController;
