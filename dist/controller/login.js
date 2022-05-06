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
const google_verify_1 = require("../helpers/google-verify");
const usuario_1 = require("../models/usuario");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("../middlewares/jwt");
class LoginController {
    static SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.body.token;
            //console.log(token);
            try {
                const { sub, name, email, picture } = yield (0, google_verify_1.googleVerify)(token);
                //console.log(sub);
                let buscar = yield usuario_1.Usuario.findAll({
                    where: {
                        uid: sub
                    }
                });
                if (!buscar) {
                    let result = yield usuario_1.Usuario.create({
                        uid: sub,
                        nombre: name,
                        email: email,
                        img: picture,
                        token: token,
                        role: 'google'
                    });
                    if (result) {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'Se ha creado correctamente',
                            token, sub, name, email, picture
                        });
                    }
                    else {
                        return res.status(401).send({
                            status: 'error',
                            mensaje: 'no se guardaron los datos de usuario'
                        });
                    }
                }
                else {
                    let actu = yield usuario_1.Usuario.update({
                        nombre: name,
                        img: picture,
                        token: token
                    }, { where: { uid: sub } });
                    if (actu) {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'se ha actualizado correctamente',
                            token, sub
                        });
                    }
                    else {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'Usuario no encontrado',
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.status(401).send({
                    status: 'error',
                    mensaje: 'Token invalido'
                });
            }
        });
    }
    static renewToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header('x-token');
            let tipo = req.header('tipo');
            //console.log('algo', token);
            if (!token) {
                return res.status(200).send({
                    status: false,
                    mensaje: 'Token invalido'
                });
            }
            if (tipo === 'google') {
                const { sub, sta, error, name, email, picture } = yield (0, google_verify_1.googleVerify)(token);
                if (sta) {
                    const usuario = yield usuario_1.Usuario.findOne({ where: { uid: sub } });
                    if (!usuario) {
                        return res.status(200).send({
                            status: false,
                            mensaje: 'Usuario uid no encontrado'
                        });
                    }
                    return res.status(200).send({
                        status: sta,
                        sub,
                        name,
                        email,
                        picture: picture || usuario.img,
                        token
                    });
                }
                else {
                    return res.status(200).send({
                        status: false,
                        mensaje: 'Token invalido'
                    });
                }
            }
            else {
                const uid = req.uid;
                const token = yield (0, jwt_1.generarJWT)(uid);
                const usuario = yield usuario_1.Usuario.findOne({ where: { uid: uid } });
                if (!usuario) {
                    return res.status(200).send({
                        status: false,
                        mensaje: 'Usuario uid no encontrado'
                    });
                }
                return res.status(200).send({
                    status: true,
                    sub: usuario === null || usuario === void 0 ? void 0 : usuario.uid,
                    name: usuario === null || usuario === void 0 ? void 0 : usuario.nombre,
                    email: usuario === null || usuario === void 0 ? void 0 : usuario.email,
                    picture: usuario === null || usuario === void 0 ? void 0 : usuario.img,
                    token
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const resp = yield usuario_1.Usuario.findOne({ where: { email: email } });
                if (!resp) {
                    return res.status(200).send({
                        status: false,
                        mensaje: 'Usuario no encontrado'
                    });
                }
                const validPassword = (0, bcryptjs_1.compareSync)(password, resp.password);
                if (!validPassword) {
                    return res.status(200).json({
                        status: false,
                        msg: 'Contraseña no válida'
                    });
                }
                let token = yield (0, jwt_1.generarJWT)(resp.uid);
                return res.status(200).send({
                    status: true,
                    token
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error de login'
                });
            }
        });
    }
}
exports.default = LoginController;
