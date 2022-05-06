import { Request, Response } from 'express';
import { Sequelize } from 'sequelize/types';
import { Articulo } from '../models/articulo';
import { Asignacion, Detalle_asig } from '../models/asignacion';
import { Empleado } from '../models/empleado';
import { db } from '../bd/bd';

type UserAttributes = {
    cod_asig: number,
    fecha: Date,
    responsable: string,
    descripcion:string,
    cod_emp:string
  };
export default class AsignacionController {
    
 
   static async save(req: Request, res: Response){
        var params = req.body;
            try{
                
                const newasignacion = await Asignacion.create(params);
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

    static async infoEmpleAsig(req: Request, res: Response){
        let id = req.params.id;
        const { limite = 5, desde = 0 } = req.query;
        try{
            let resul = await Asignacion.findAll({ 
                where: {cod_emp: id},
                offset: Number(desde), 
                limit: Number(limite),
            });
            return res.status(200).send({
                status: 'success',
                resul
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar',
                error
            }); 
        }
       
   
    }
    static async pdfEmpleAsig(req: Request, res: Response){
        let id = req.params.id;
        try{
            let consulta = await db.query(`SELECT d.cod_asig, e.cod_emp, e.nombre as n_empleado, e.dni, ar.cod_art, ar.nombre FROM detalle_asig as d INNER JOIN asignacion as a ON a.cod_asig = d.cod_asig INNER JOIN empleado as e ON e.cod_emp = a.cod_emp INNER JOIN articulo as ar ON d.cod_art = ar.cod_art WHERE d.cod_asig = ${id}`)
            if(consulta.length > 0) {
                return res.status(200).send({
                    status: 'success',
                    datos: consulta[0]
                });
            }
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar',
                error
            }); 
        }
       
    }

}