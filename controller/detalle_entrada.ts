import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Entrada, Detalle_entra } from '../models/entrada';


export default class Detalle_entraController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let result = await Detalle_entra.create(params);
                if(result){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        result
                    }); 
                } 
            } catch(error) {
                console.log(error);
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error de creacion'
                }); 

            }
    }
    
    static async update_ren(req: Request, res: Response){
        let params = req.body;
        const { id = 1, ren = 0 } = req.query;
        try{
            let buscar_cab = await Entrada.findOne({ where: { cod_entra: id }});
            if(buscar_cab){
                let result = await Detalle_entra.update(params,{ 
                    where: { 
                        [Op.and]: [
                            {cod_entra: id},
                            {reg_entra: ren}
                        ]
                    } 
                });
                if(result){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    }); 
                } else {
                    console.log('error');
                    return res.status(400).send({
                        status: 'error',
                        mensaje: 'Problemas al actualizar'
                    });
                }
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'entrada no encontrado',
                }); 
            }
            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error en actualizacion'
            }); 
        }
    }
    
}
