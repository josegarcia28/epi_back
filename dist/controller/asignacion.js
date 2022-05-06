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
const asignacion_1 = require("../models/asignacion");
const bd_1 = require("../bd/bd");
class AsignacionController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = req.body;
            try {
                const newasignacion = yield asignacion_1.Asignacion.create(params);
                if (newasignacion) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        newasignacion
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
                let result = yield asignacion_1.Asignacion.update(params, { where: { cod_asig: id } });
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
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0 } = req.query;
            try {
                const [asig, total] = yield Promise.all([
                    asignacion_1.Asignacion.findAll({
                        offset: Number(desde),
                        limit: Number(limite),
                        include: asignacion_1.Detalle_asig
                    }),
                    asignacion_1.Asignacion.count()
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    asig
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
                let result = yield asignacion_1.Asignacion.findOne({ where: { cod_asig: id }, include: asignacion_1.Detalle_asig });
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
    static infoEmpleAsig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const { limite = 5, desde = 0 } = req.query;
            try {
                let resul = yield asignacion_1.Asignacion.findAll({
                    where: { cod_emp: id },
                    offset: Number(desde),
                    limit: Number(limite),
                });
                return res.status(200).send({
                    status: 'success',
                    resul
                });
            }
            catch (error) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al listar',
                    error
                });
            }
        });
    }
    static pdfEmpleAsig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let consulta = yield bd_1.db.query(`SELECT d.cod_asig, e.cod_emp, e.nombre as n_empleado, e.dni, ar.cod_art, ar.nombre FROM detalle_asig as d INNER JOIN asignacion as a ON a.cod_asig = d.cod_asig INNER JOIN empleado as e ON e.cod_emp = a.cod_emp INNER JOIN articulo as ar ON d.cod_art = ar.cod_art WHERE d.cod_asig = ${id}`);
                if (consulta.length > 0) {
                    return res.status(200).send({
                        status: 'success',
                        datos: consulta[0]
                    });
                }
            }
            catch (error) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al listar',
                    error
                });
            }
        });
    }
}
exports.default = AsignacionController;
