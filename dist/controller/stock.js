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
const articulo_1 = require("../models/articulo");
const stock_1 = require("../models/stock");
class StockController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                const [Alma, Arti] = yield Promise.all([
                    almacen_1.Almacen.findOne({
                        where: { cod_alm: params.cod_alm }
                    }),
                    articulo_1.Articulo.findOne({
                        where: { cod_art: params.cod_art }
                    }),
                ]);
                if (!Alma) {
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo de almacen no existe',
                        Alma
                    });
                }
                if (!Arti) {
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo del articulo no existe',
                        Arti
                    });
                }
                if (Alma && Arti) {
                    const { cod_art, cod_alm } = params;
                    params.cod_stock = cod_art + cod_alm;
                    let result = yield stock_1.Stock.create(params);
                    if (result) {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'Se ha creado correctamente',
                            result
                        });
                    }
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
            //const { id_alm, id_art} = req.query;
            const id = `${params.cod_art}${params.cod_alm}`;
            console.log(params);
            try {
                let buscar = yield stock_1.Stock.findOne({ where: { cod_stock: id } });
                if (buscar) {
                    let actualizar = yield stock_1.Stock.update(params, { where: { cod_stock: id } });
                    if (actualizar) {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'se ha actualizado correctamente',
                            actualizar
                        });
                    }
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Stock no encontrado',
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
                let resul = yield stock_1.Stock.destroy({ where: { cod_stock: id } });
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
                const [Alma, total] = yield Promise.all([
                    stock_1.Stock.findAll({
                        offset: Number(desde),
                        limit: Number(limite)
                    }),
                    stock_1.Stock.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    Alma
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
                let result = yield stock_1.Stock.findOne({
                    where: { cod_stock: id }
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
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alma, id_art } = req.query;
            const id = `${id_art}${id_alma}`;
            try {
                let result = yield stock_1.Stock.findOne({
                    where: { cod_stock: id }
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
exports.default = StockController;
