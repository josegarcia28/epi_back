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
                        token: token
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
            if (!token) {
                return res.status(401).send({
                    status: 'error',
                    mensaje: 'Token invalido'
                });
            }
            const { sub, sta, error, name, email, picture } = yield (0, google_verify_1.googleVerify)(token);
            //console.log(sta);
            if (sta) {
                return res.status(200).send({
                    status: sta,
                    mensaje: error,
                    token, sub, sta,
                    name, email, picture
                });
            }
            else {
                return res.status(200).send({
                    status: false,
                    mensaje: 'Token invalido'
                });
            }
        });
    }
}
exports.default = LoginController;
