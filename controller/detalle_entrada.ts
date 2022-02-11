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

    static async list(req: Request, res: Response){
        let cod = req.params.id;
        try{
            let buscar_deta = await Detalle_entra.findAll({ where: { cod_entra: cod }});
            return res.status(200).send({
                status: 'success',
                buscar_deta
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar detalles'
            }); 
        }
       
    }

    static async detail(req: Request, res: Response){
        let id_asig = req.params.cod_asig;
        let id_reglon = req.params.cod_renglon;
        try{
            let buscar_deta = await Detalle_entra.findOne({ where: { cod_entra: id_asig, reg_entra: id_reglon}});
            return res.status(200).send({
                status: 'success',
                buscar_deta
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await Detalle_entra.findOne({ where: { id: id }});
            if(!resul){
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'No se encontro registro a eliminar'
                });
            } 
            let resp = await Detalle_entra.destroy({ where: { id: id }});
            if(resp){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha eliminado correctamente',
                    resul
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

    static async detailId(req: Request, res: Response){
        let id = req.params.id;
        try{
            let buscar_deta = await Detalle_entra.findOne({ where: { id: id}});
            return res.status(200).send({
                status: 'success',
                buscar_deta
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    
}
