//const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import Jwt  from 'jsonwebtoken';

export interface IPayload {
    _id: string;
    iat: number;
} 

export const generarJWT = ( uid: string | undefined ) => {
    //let JWT_SECRET='Holsdj28397kjHd7@asdyui3897k';
   /* let token:string = req.header('x-token') || '';

    return new Promise( ( resolve, reject ) => {
        if ( !token || token.length == 0) {
            reject('token no encontrado')
        }
        try{
            const payload = Jwt.verify(token, JWT_SECRET) as IPayload;
            //console.log(payload.uid); 
            resolve(payload._id)
        } catch (error) {
           reject('token no valido')
        }
    
    });*/
    const payload = {
        uid,
    };

    return new Promise( ( resolve, reject ) => {
        try{
            Jwt.sign(payload, 'Holsdj28397kjHd7@asdyui3897k', {
                expiresIn: '12h'
            }, ( err, token ) => {
                if ( err ) {
                    reject('error al crear token')
                } else {
                    resolve(token)
                }
            });
        } catch (error) {
           reject('token no valido')
        }
    
    });

}
