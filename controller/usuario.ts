import { Request, Response } from 'express';
import {Usuario}  from '../models/usuario';
import bcrypt from 'bcryptjs';

export default class UsuarioController {


    static async save(req: Request, res: Response){
        const emailExists = await Usuario.findOne({where: { email: req.body.email }});
        if (emailExists) return res.status(200).send({
            status: false,
            mensaje: 'El email ya existe'
        });
        try{
            const usuario = Usuario.build({
                uid: req.body.uid, 
                nombre: req.body.nombre, 
                password: req.body.password, 
                token: req.body.token, 
                email: req.body.email, 
                img: req.body.img, 
                role: req.body.role, 
                status: req.body.status, 
            })
            let salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
            let result = await usuario.save();
            if(result){
                return res.status(200).send({
                    status: 'success',
                    mensaje: 'se ha creado correctamente',
                }); 
            } else {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error en creacion'
                }); 
            }
        } catch(error) {
            console.log(error);
            return false;

        }
    }
    
    static async update(req: Request, res: Response){
        const emailExists = await Usuario.findOne({where: { email: req.body.email }});
        if (!emailExists) return res.status(200).send({
            status: false,
            mensaje: 'No existe el email'
        });
        try{
            let salt = await bcrypt.genSalt(10);
            let newpass = await bcrypt.hash(req.body.password, salt);
            let buscar = await Usuario.update({
                password: newpass,
                role: req.body.role
            }, {where: { email: req.body.email}});
            
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
       
    }*/

    static async buscarEmail(req: Request, res: Response){
        let email = req.headers.email;

        try{
            let result = await Usuario.findOne({
                where: { email: email}
            });
            return res.status(200).send({
                status: true,
                result
            });
        } catch (error){
            return res.status(400).send({
                status: 'error',
                error
            }); 
        }
    }
}