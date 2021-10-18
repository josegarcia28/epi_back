import { Request, Response } from 'express';
import { Asignacion, Detalle_asig } from '../models/asignacion';


export default class AsignacionController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let newasignacion = await Asignacion.create(params);
                if(newasignacion){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        newasignacion
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
            let result = await Asignacion.update(params,{ where: { cod_asig: id } });
            if(result){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                    result
                }); 
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'codigo no encontrado',
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
    */
   static async list_cab(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [asig, total] = await Promise.all([
                Asignacion.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Asignacion.count()

            ]);
            return res.status(200).send({
                status: 'success',
                total,
                asig
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    static async list(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [asig, total] = await Promise.all([
                Asignacion.findAll({
                    offset: Number(desde), 
                    limit: Number(limite),
                    include: Detalle_asig
                }),
                Asignacion.count()

            ]);
            return res.status(200).send({
                status: 'success',
                total,
                asig
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
            let result = await Asignacion.findOne({ where: { cod_asig: id }, include: Detalle_asig });
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