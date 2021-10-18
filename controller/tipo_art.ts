import { Request, Response } from 'express';
import Tipo_art from '../models/tipo_art';


export default class Tipo_artController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let newtipo_art = await Tipo_art.create(params);
                if(newtipo_art){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        newtipo_art
                    }); 
                } 
            } catch(error: any) {
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
            let result = await Tipo_art.update(params,{ where: { cod_tipo: id } });;
            if(result){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                    result
                }); 
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'tipo_art no encontrado',
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
            let resul = await Tipo_art.destroy({where: {cod_art: id}});
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
            const [Tipo, total] = await Promise.all([
                Tipo_art.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Tipo_art.count()

            ]);
            return res.status(200).send({
                status: 'success',
                total,
                Tipo
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
            let result = await Tipo_art.findOne({ where: { cod_tipo: id } });
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