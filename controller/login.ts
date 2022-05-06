import { Request, Response } from 'express';
import { googleVerify } from '../helpers/google-verify';
import { Usuario,  } from '../models/usuario';
import { compareSync } from 'bcryptjs';
import { generarJWT } from '../middlewares/jwt';


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
                        token: token,
                        role: 'google'
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
        let tipo = req.header('tipo');
        //console.log('algo', token);
        if ( !token ) {
            return res.status(200).send({
                status: false,
                mensaje: 'Token invalido'
            }); 
        }
        if(tipo === 'google'){
            
            const {sub, sta, error, name, email, picture} = await googleVerify(token);
            if(sta){
                const usuario = await Usuario.findOne( {where: { uid: sub }} );
                if ( !usuario ) {
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
            } else {
                return res.status(200).send({
                    status: false,
                    mensaje: 'Token invalido'
                }); 
            }
        } else {
            const uid = req.uid;
            const token = await generarJWT( uid );
            const usuario = await Usuario.findOne( {where: { uid: uid }} );
            if ( !usuario ) {
                return res.status(200).send({
                    status: false,
                    mensaje: 'Usuario uid no encontrado'
                });
            }
            return res.status(200).send({
                status: true,
                sub: usuario?.uid,
                name:usuario?.nombre,
                email: usuario?.email,
                picture: usuario?.img,
                token
            }); 

            
        }
        
    }

    static async login(req: Request, res: Response){    
    const { email, password } = req.body;
        try {
            const resp = await Usuario.findOne({where: { email: email }})
            if ( !resp ) {
                return res.status(200).send({
                    status: false,
                    mensaje: 'Usuario no encontrado'
                });
            }
            const validPassword = compareSync( password, resp.password );
            
            if ( !validPassword ) {
                return res.status(200).json({
                    status: false,
                    msg: 'Contraseña no válida'
                });
            }
            let token = await generarJWT(resp.uid);
            return res.status(200).send({
                status: true,
                token
            });
            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error de login'
            }); 

        }
    }    
}
