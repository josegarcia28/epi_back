import { Request, Response } from 'express';
import { Entrada, Detalle_entra } from '../models/entrada';


export default class EntradaController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let nuevo = await Entrada.create(params);
                if(nuevo){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'Se ha creado correctamente',
                        nuevo
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
            let result = await Entrada.update(params,{ where: { cod_entra: id } });
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
            const [entra, total] = await Promise.all([
                Entrada.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Entrada.count()

            ]);
            return res.status(200).send({
                status: 'success',
                total,
                entra
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
            const [entra, total] = await Promise.all([
                Entrada.findAll({
                    offset: Number(desde), 
                    limit: Number(limite),
                    include: Detalle_entra
                }),
                Entrada.count()

            ]);
            return res.status(200).send({
                status: 'success',
                total,
                entra
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
            let result = await Entrada.findOne({ where: { cod_entra: id }, include: Detalle_entra });
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