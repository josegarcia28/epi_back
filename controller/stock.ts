import { Request, Response } from 'express';
import { Almacen } from '../models/almacen';
import { Articulo } from '../models/articulo';
import { Stock } from '../models/stock';


export default class StockController {
 
   static async save(req: Request, res: Response){
        var params = req.body;

            try{
                const [Alma, Arti] = await Promise.all([
                    Almacen.findOne({
                        where: { cod_alm: params.cod_alm}
                    }),
                    Articulo.findOne({
                        where: { cod_art: params.cod_art}
                    }),
                ]);
                if(!Alma){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo de almacen no existe',
                        Alma
                    }); 
                }
                if(!Arti){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'El codigo del articulo no existe',
                        Arti
                    }); 
                }
                if(Alma && Arti){
                    const {cod_art, cod_alm} = params
                    params.cod_stock = cod_art + cod_alm
                    let result = await Stock.create(params);
                    if(result){
                        return res.status(200).send({
                            status: 'success',
                            mensaje: 'Se ha creado correctamente',
                            result
                        }); 
                    } 
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
        //const { id_alm, id_art} = req.query;
        const id = `${params.cod_art}${params.cod_alm}`;
        console.log(params);
        try{
            let buscar = await Stock.findOne({where: { cod_stock: id}});
            if(buscar){
                let actualizar = await Stock.update(params, {where: { cod_stock: id}});
                if(actualizar){
                    return res.status(200).send({
                        status: 'success',
                        mensaje: 'se ha actualizado correctamente',
                        actualizar
                    }); 
                }  
            } else {
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'Stock no encontrado',
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
            let resul = await Stock.destroy({ where: {cod_stock: id}});
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
            const [Alma, total] = await Promise.all([
                Stock.findAll({
                    offset: Number(desde), 
                    limit: Number(limite)
                }),
                Stock.count()
            ]);
            return res.status(200).send({
                status: 'success',
                total,
                Alma
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
            let result = await Stock.findOne({
                where: { cod_stock: id}
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

    static async buscar(req: Request, res: Response){
        const { id_alma, id_art} = req.query;
        const id = `${id_art}${id_alma}`;
        try{
            let result = await Stock.findOne({
                where: { cod_stock: id }
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