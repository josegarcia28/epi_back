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
const proveedor_1 = require("../models/proveedor");
function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
class ProveedorController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            if (Object.keys(params).length === 0) {
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'No se enviaron elementos'
                });
            }
            try {
                let result = yield proveedor_1.Proveedor.create(params);
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
            if (Object.keys(params).length === 0) {
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'No se enviaron elementos'
                });
            }
            try {
                let buscar = yield proveedor_1.Proveedor.update(params, { where: { cif_pro: id } });
                if (buscar) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'error',
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
                    proveedor_1.Proveedor.findAll({
                        offset: Number(desde),
                        limit: Number(limite)
                    }),
                    proveedor_1.Proveedor.count()
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
            let id = req.params.id;
            try {
                let result = yield proveedor_1.Proveedor.findOne({
                    where: { cif_pro: id }
                });
                //console.log(result);
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
exports.default = ProveedorController;
