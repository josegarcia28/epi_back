import { Request, Response } from 'express';
import {Empleado} from '../models/empleado';

export default class EmpleadoController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                let result = await Empleado.create(params);
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
            let buscar = await Empleado.findOne({
                where: { cod_emp: id}
            });
            if(buscar){
                let result = await Empleado.update(params, {where: { cod_emp: id}});
                if(result){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                    }); 
                }
            } else {
                return res.status(200).send({
                    status: 'error',
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

    }*/

    static async list(req: Request, res: Response){
        const { limite = 0, desde = 0 } = req.query;
        try{
            if(limite === 0){
                const [empleado, total] = await Promise.all([
                    Empleado.findAll({
                        where: {estatus: 1},
                        offset: Number(desde)
                    }),
                    Empleado.count({where: {estatus: 1}})
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    empleado
                });
            } else {
                const [empleado, total] = await Promise.all([
                    Empleado.findAll({
                        where: {estatus: 1},
                        offset: Number(desde), 
                        limit: Number(limite)
                    }),
                    Empleado.count({where: {estatus: 1}})
                ]);
                return res.status(200).send({
                    status: 'success',
                    total,
                    empleado
                });
            }
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

    static async detail(req: Request, res: Response){
        let cod_emp = req.params.id;
        try{
            let result = await Empleado.findOne({
                where: { cod_emp: cod_emp}
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