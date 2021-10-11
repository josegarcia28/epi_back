/*import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {entrada} from '../entity/entrada';

export default class EntradaController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let newentrada = getRepository(entrada).create(params);
                let result = await getRepository(entrada).save(newentrada);
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
            let buscar = await getRepository(entrada).findOne(id);
            if(buscar){
                getRepository(entrada).merge(buscar, params);
                let result = await getRepository(entrada).save(buscar);
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
    static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await getRepository(entrada).delete(id);
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
        try{
            let entradas = await getRepository(entrada).find();
            return res.status(200).send({
                status: 'success',
                entradas
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
            let result = await getRepository(entrada).findOne(id);
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

}*/