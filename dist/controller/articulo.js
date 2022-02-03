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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articulo_1 = require("../models/articulo");
const tipo_art_1 = __importDefault(require("../models/tipo_art"));
class ArticuloController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                let result = yield articulo_1.Articulo.create(params);
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
                let buscar = yield articulo_1.Articulo.update(params, { where: { cod_art: id } });
                if (buscar) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Articulo no encontrado',
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
    static subir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            let id = req.params.id;
            try {
                let buscar = yield articulo_1.Articulo.update(params, { where: { cod_art: id } });
                if (buscar) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Articulo no encontrado',
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
                let resul = yield articulo_1.Articulo.destroy({ where: { cod_art: id } });
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
                const [articulo, total] = yield Promise.all([
                    articulo_1.Articulo.findAll({
                        include: [
                            tipo_art_1.default
                        ],
                        offset: Number(desde),
                        limit: Number(limite)
                    }),
                    articulo_1.Articulo.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    articulo
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
                let result = yield articulo_1.Articulo.findOne({
                    where: { cod_art: id },
                    include: tipo_art_1.default
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
exports.default = ArticuloController;
