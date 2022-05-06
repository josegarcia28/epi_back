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
const usuario_1 = require("../models/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield usuario_1.Usuario.findOne({ where: { email: req.body.email } });
            if (emailExists)
                return res.status(200).send({
                    status: false,
                    mensaje: 'El email ya existe'
                });
            try {
                const usuario = usuario_1.Usuario.build({
                    uid: req.body.uid,
                    nombre: req.body.nombre,
                    password: req.body.password,
                    token: req.body.token,
                    email: req.body.email,
                    img: req.body.img,
                    role: req.body.role,
                    status: req.body.status,
                });
                let salt = yield bcryptjs_1.default.genSalt(10);
                usuario.password = yield bcryptjs_1.default.hash(usuario.password, salt);
                let result = yield usuario.save();
                if (result) {
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha creado correctamente',
                    });
                }
                else {
                    return res.status(400).send({
                        status: 'error',
                        mensaje: 'Error en creacion'
                    });
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield usuario_1.Usuario.findOne({ where: { email: req.body.email } });
            if (!emailExists)
                return res.status(200).send({
                    status: false,
                    mensaje: 'No existe el email'
                });
            try {
                let salt = yield bcryptjs_1.default.genSalt(10);
                let newpass = yield bcryptjs_1.default.hash(req.body.password, salt);
                let buscar = yield usuario_1.Usuario.update({
                    password: newpass,
                    role: req.body.role
                }, { where: { email: req.body.email } });
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

    }

    static async list(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [prov, total] = await Promise.all([
                Proveedor.findAll({
                    offset: Number(desde),
                    limit: Number(limite)
                }),
                Proveedor.count()
            ]);
            return res.status(200).send({
                status: 'success',
                total,
                prov
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            });
        }
       
    }

    static async detail(req: Request, res: Response){
        let cod_prov = req.params.id;
        try{
            let result = await Proveedor.findOne({
                where: { cod_prov: cod_prov}
            });
            return res.status(200).send({
                status: 'success',
                result
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            });
        }
       
    }*/
    static buscarEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.headers.email;
            try {
                let result = yield usuario_1.Usuario.findOne({
                    where: { email: email }
                });
                return res.status(200).send({
                    status: true,
                    result
                });
            }
            catch (error) {
                return res.status(400).send({
                    status: 'error',
                    error
                });
            }
        });
    }
}
exports.default = UsuarioController;
