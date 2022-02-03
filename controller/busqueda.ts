import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Empleado } from '../models/empleado';
import { Articulo } from '../models/articulo';
import { Proveedor } from '../models/proveedor';

export default class BusquedaController {
    static async getTodo(req: Request, res: Response){
        //var params = req.body;
        var tabla    = req.params.tabla;
        var busqueda = req.params.busqueda;
        let data = [];

        switch ( tabla ) {
            case 'empleado':
                data = await Empleado.findAll ({
                    where: { 
                        nombre:{
                            [Op.like]: `%${busqueda}%`
                        }
                    }
                });
            break;

            case 'articulo':
                data = await Articulo.findAll ({
                    where: { 
                        nombre:{
                            [Op.like]: `%${busqueda}%`
                        }
                    }
                });
            break;

            case 'proveedor':
                data = await Proveedor.findAll ({
                    where: { 
                        nombre:{
                            [Op.like]: `%${busqueda}%`
                        }
                    }
                });
                
            break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser empleado/articulo/proveedor'
                });
        }
        try{
            if(data){
                return res.status(200).send({
                    status: 'success',
                    data
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

}