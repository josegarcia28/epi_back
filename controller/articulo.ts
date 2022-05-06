import { Request, Response } from 'express';
import { Articulo } from '../models/articulo';
import Tipo_art from '../models/tipo_art';
import { db } from '../bd/bd';

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

    static async actualizarStock(req: Request, res: Response){
        //let params = req.body;
        let id = req.params.id;
        let cant = req.params.cant;
        try{
            //let buscar = await Articulo.update(params, {where: { cod_art: id}});
            let buscar = await Articulo.findOne({where: { cod_art: id}});
            console.log(buscar);
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

    static async subir(req: Request, res: Response){
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

    /*attributes: [
                        
    ],*/

    static async list(req: Request, res: Response){
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [articulo, total] = await Promise.all([
                Articulo.findAll({
                    include: [
                        Tipo_art
                    ],
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

    static async generarCodigo(req: Request, res: Response){
        let ini = req.params.ini;
        try{
            let consulta = await db.query(`SELECT CONCAT(SUBSTRING(MAX(cod_art), 1,3) , LPAD(SUBSTRING(MAX(cod_art), 4,3) + 1,3,'0')) as numero FROM articulo WHERE SUBSTRING(cod_art, 1,3) = ${ini}`)
            
            if(consulta.length > 0) {
                return res.status(200).send({
                    status: 'success',
                    datos: consulta[0]
                });
            }
        } catch (error){
            return res.status(400).send({
                status: 'error',
                mensaje: 'Error al listar'
            }); 
        }
       
    }

}