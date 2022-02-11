import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Articulo } from '../models/articulo';
import { Asignacion, Detalle_asig } from '../models/asignacion';


export default class Detalle_asigController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let result = await Detalle_asig.create(params);
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
        try{
            let result = await Detalle_asig.update(params,{ 
                where: { 
                    [Op.and]: [
                        {id: params.id}
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
           
            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error en actualizacion'
            }); 
        }
    }
    
    /*static async update_ren(req: Request, res: Response){
        let params = req.body;
        const { id = 1, ren = 0 } = req.query;
        try{
            let buscar_cab = await Asignacion.findOne({ where: { cod_asig: id }});
            if(buscar_cab){
                const [art, alma] = await Promise.all([
                    Articulo.findOne({ where: { cod_art: params.cod_art }}),
                    Articulo.findOne({ where: { cod_alm: params.cod_alm }}),
                ]);
                if(!art){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo de articulo no existe',
                    }); 
                }
                if(!alma){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo del almacem no existe',
                    }); 
                }
                let result = await Detalle_asig.update(params,{ 
                    where: { 
                        [Op.and]: [
                            {cod_asig: id},
                            {reg_asig: ren}
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
    }*/

    static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await Detalle_asig.findOne({ where: { id: id }});
            if(!resul){
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'No se encontro registro a eliminar'
                });
            } 
            let resp = await Detalle_asig.destroy({ where: { id: id }});
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

    static async list(req: Request, res: Response){
        let cod = req.params.id;
        try{
            let buscar_deta = await Detalle_asig.findAll({ where: { cod_asig: cod }});
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
            let buscar_deta = await Detalle_asig.findOne({ where: { cod_asig: id_asig, reg_asig: id_reglon}});
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

    static async detailId(req: Request, res: Response){
        let id = req.params.id;
        try{
            let buscar_deta = await Detalle_asig.findOne({ where: { id: id}});
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
