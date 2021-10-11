/*import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {empleado} from '../entity/empleado';

export default class EmpleadoController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let newempleado = getRepository(empleado).create(params);
                let result = await getRepository(empleado).save(newempleado);
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
            let buscar = await getRepository(empleado).findOne(id);
            if(buscar){
                getRepository(empleado).merge(buscar, params);
                let result = await getRepository(empleado).save(buscar);
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
    static async delete(req: Request, res: Response){
        let id = req.params.id;
        try{
            let resul = await getRepository(empleado).delete(id);
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
            let empleados = await getRepository(empleado).find();
            return res.status(200).send({
                status: 'success',
                empleados
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    static async detail(req: Request, res: Response){
        let cod_emp = req.params.id;
        console.log(cod_emp);
        try{
            let result = await getRepository(empleado).findOne(cod_emp);
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