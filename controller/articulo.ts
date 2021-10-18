import { Request, Response } from 'express';
import { Articulo } from '../models/articulo';
import Tipo_art from '../models/tipo_art';


export default class ArticuloController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let result = await Articulo.create(params);
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
            let buscar = await Articulo.update(params, {where: { cod_art: id}});
            if(buscar){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                }); 
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'Articulo no encontrado',
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
            let resul = await Articulo.destroy({ where: {cod_art: id}});
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

    static async list(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [articulo, total] = await Promise.all([
                Articulo.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Articulo.count()
            ]);
            return res.status(200).send({
                status: 'success',
                total,
                articulo
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
            let result = await Articulo.findOne({
                where: { cod_art: id},
                include: Tipo_art
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