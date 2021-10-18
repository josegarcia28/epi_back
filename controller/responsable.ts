import { Request, Response } from 'express';
import {Responsable} from '../models/responsable';

export default class ResponsableController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let result = await Responsable.create(params);
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

    static async update(req: Request, res: Response){
        let params = req.body;
        let id = req.params.id;
        try{
            let buscar = await Responsable.update(params, {where: { cod_resp: id}});
            if(buscar){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                }); 
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'Usuario no encontrado',
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
    /*static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await getRepository(Proveedor).delete(id);
            if(resul){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha eliminado correctamente',
                    resul
                }); 
            } else {
                console.log('error');
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Problemas al eliminar'
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al eliminar'
            }); 
        }

    }*/

    static async list(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [prov, total] = await Promise.all([
                Responsable.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Responsable.count()
            ]);
            return res.status(200).send({
                status: 'success',
                total,
                prov
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    static async detail(req: Request, res: Response){
        let cod_resp = req.params.id;
        try{
            let result = await Responsable.findOne({
                where: { cod_resp: cod_resp}
            });
            return res.status(200).send({
                status: 'success',
                result
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

}