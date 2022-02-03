import { Request, Response } from 'express';
import { Almacen } from '../models/almacen';


export default class AlmacenController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let result = await Almacen.create(params);
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
            let buscar = await Almacen.update(params, {where: { cod_alm: id}});
            if(buscar){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                }); 
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'Almacen no encontrado',
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
    
    static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await Almacen.destroy({ where: {cod_alm: id}});
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

    }

    /*attributes: [
                        
    ],*/

    static async list(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [almacenes, total] = await Promise.all([
                Almacen.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Almacen.count()
            ]);
            return res.status(200).send({
                status: 'success',
                total,
                almacenes
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    static async detail(req: Request, res: Response){
        let id = req.params.id;
        try{
            let result = await Almacen.findOne({
                where: { cod_alm: id}
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