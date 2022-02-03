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
class validarJwt {
    static Campo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header('x-token');
            if (!token) {
                return res.status(401).send({
                    status: 'error',
                    error: 'No se ha enviado el token'
                });
            }
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
                console.log(error);
                return res.status(401).send({
                    status: 'error',
                    mensaje: 'Token invalido'
                });
            }
            /*try{
                //const { sub } = await googleVerify(token);
                //console.log(sub);
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                console.log(payload);
                console.log(userid);
                req.sub = sub;
                next();
            } catch(error) {
                console.log(error);
                return res.status(401).send({
                    status: 'error',
                    mensaje: 'Token invalido'
                });
    
            }*/
        });
    }
}
exports.default = validarJwt;
