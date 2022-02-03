import { Request, Response } from 'express';
import { googleVerify } from '../helpers/google-verify';
import { Usuario } from '../models/usuario';




export default class LoginController {
 
   static async SignIn(req: Request, res: Response){
        let token = req.body.token;
        //console.log(token);
            try{
                const { sub, name, email, picture } = await googleVerify(token);
                //console.log(sub);
                let buscar = await Usuario.findAll({
                    where: {
                        uid: sub
                    }
                });
                if(!buscar){
                    let result = await Usuario.create({
                        uid: sub,
                        nombre: name,
                        email: email,
                        img: picture,
                        token: token
                    });
                    if(result){
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'Se ha creado correctamente',
                            token, sub, name, email, picture
                        }); 
                    } else {
                        return res.status(401).send({
                            status: 'error',
                            mensaje: 'no se guardaron los datos de usuario'
                        }); 
                    }
                } else {
                    let actu = await Usuario.update({
                        nombre: name,
                        img: picture,
                        token: token
                        }, 
                        {where: { uid: sub}});
                    if(actu){
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'se ha actualizado correctamente',
                            token, sub
                        }); 
                    } else {
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'Usuario no encontrado',
                        }); 
                    }
                }
            } catch(error) {
                console.log(error);
                return res.status(401).send({
                    status: 'error',
                    mensaje: 'Token invalido'
                }); 

            }
    }

    static async renewToken(req: Request, res: Response){

        let token = req.header('x-token');
        if ( !token ) {
            return res.status(401).send({
                status: 'error',
                mensaje: 'Token invalido'
            }); 
        }
        const {sub, sta, error, name, email, picture} = await googleVerify(token);
        //console.log(sta);
        if(sta){
            return res.status(200).send({
                status: sta,
                mensaje: error,
                token, sub, sta,
                name, email, picture
            }); 
        } else {
            return res.status(200).send({
                status: false,
                mensaje: 'Token invalido'
            }); 
        }
    }

}

