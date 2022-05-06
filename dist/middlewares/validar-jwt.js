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
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');
class validarJwt {
    static Campo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header('x-token');
            let tipo = req.header('tipo');
            if (token === 'undefined' || !token) {
                return res.status(200).send({
                    status: false,
                    error: 'No se ha enviado el token'
                });
            }
            if (tipo === 'google') {
                try {
                    const ticket = yield client.verifyIdToken({
                        idToken: token,
                        audience: process.env.CLIENT_ID,
                    });
                    const payload = ticket.getPayload();
                    const { sub, name, email, picture } = payload;
                    req.sub = sub;
                    next();
                }
                catch (error) {
                    return res.status(200).send({
                        status: false,
                        mensaje: 'Token invalido1'
                    });
                }
            }
            else {
                try {
                    console.log('singoo');
                    const { uid } = jwt.verify(token, 'Holsdj28397kjHd7@asdyui3897k');
                    req.uid = uid;
                    next();
                }
                catch (error) {
                    console.log(error);
                    return res.status(200).send({
                        status: false,
                        mensaje: 'Token invalido2'
                    });
                }
            }
        });
    }
}
exports.default = validarJwt;
