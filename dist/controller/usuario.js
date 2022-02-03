"use strict";
/*import { Request, Response } from 'express';
import {Proveedor} from '../models/proveedor';
import { Usuario } from '../models/usuario';

export default class UsuarioController {
 
   static async save(params: string){
       params

            try{
                let encontro = await Proveedor.findOne({
                    where: { uid: subi}
                });

                let result = await Usuario.create(params);
                if(result){
                    return true;
                }
            } catch(error) {
                console.log(error);
                return false;

            }
    }
    
    static async update(req: Request, res: Response){
        let params = req.body;
        let id = req.params.id;
        try{
            let buscar = await Proveedor.update(params, {where: { cod_prov: id}});
            if(buscar){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha actualizado correctamente',
                });
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

    }

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
        let cod_prov = req.params.id;
        try{
            let result = await Proveedor.findOne({
                where: { cod_prov: cod_prov}
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
    
}*/ 
