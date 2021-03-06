import { Request, Response } from 'express';
import {Proveedor} from '../models/proveedor';

function isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
  
    return true;
  }

export default class ProveedorController {
 
   static async save(req: Request, res: Response){
        var params = req.body;
        if(Object.keys(params).length === 0){
            return res.status(200).send({
                status: 'error',
                mensaje: 'No se enviaron elementos'
            }); 
        }
        try{
            let result = await Proveedor.create(params);
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
        if(Object.keys(params).length === 0){
            return res.status(200).send({
                status: 'error',
                mensaje: 'No se enviaron elementos'
            }); 
        }
        try{
            let buscar = await Proveedor.update(params, {where: { cif_pro: id}});
            if(buscar){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                }); 
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
            let resul = await getRepository(Proveedor).delete(id);
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
        const { limite = 5, desde = 0 } = req.query;
        try{
            const [prov, total] = await Promise.all([
                Proveedor.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Proveedor.count()
            ]);
            return res.status(200).send({
                status: 'success',
                total,
                prov
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
            let result = await Proveedor.findOne({
                where: { cif_pro: id}
            });
            //console.log(result);
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