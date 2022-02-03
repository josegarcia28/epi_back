import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default class Validar {
    static async Campo(req: Request, res: Response, next: NextFunction ){
        let errores = validationResult( req );

        if( !errores.isEmpty() ) {
            console.log(errores);
            return res.status(400).send({
                status: 'Algunos datos en blanco',
                error: errores.mapped()
            }); 
        }
        next();
    }
} 