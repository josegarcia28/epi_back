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
const responsable_1 = require("../models/responsable");
class ResponsableController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                let result = yield responsable_1.Responsable.create(params);
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
                let buscar = yield responsable_1.Responsable.update(params, { where: { cod_resp: id } });
                if (buscar) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Usuario no encontrado',
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
            let resul = await getRepository(Proveedor).delete(id);
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

    }*/
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0 } = req.query;
            try {
                const [prov, total] = yield Promise.all([
                    responsable_1.Responsable.findAll({
                        offset: Number(desde),
                        limit: Number(limite)
                    }),
                    responsable_1.Responsable.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    prov
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
            let cod_resp = req.params.id;
            try {
                let result = yield responsable_1.Responsable.findOne({
                    where: { cod_resp: cod_resp }
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
exports.default = ResponsableController;
