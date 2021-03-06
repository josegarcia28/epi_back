import { Request, Response } from 'express';
import path from 'path';
import {existsSync} from 'fs';
import fileUpload = require('express-fileupload');
import { v4 as uuidv4 } from 'uuid';
import  Actualizar  from '../helpers/actualizar-imagen';

type UploadedFile = fileUpload.UploadedFile;

function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

/*function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
    return Array.isArray(file);
}*/

export default class CargarFile {

    static async subir(req: Request, res: Response){
        let tipo = req.params.tipo;
        let id = req.params.id;
        let fileField: any;

        const tiposValidos = ['articulo', 'empleado', 'usuario'];
        if ( !tiposValidos.includes(tipo)){
            return res.status(200).send({
                status: 'error',
                mensaje: 'Tipo no contemplado para cargar archivo',
            }); 
        } 
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(200).send({
                status: 'error',
                mensaje: 'No se cargo ningún archivo',
            }); 
        }
        if (typeof req.files === 'object') {
            fileField = req.files.imagen;
            if (isSingleFile(fileField)) {
                const nombreCortado = fileField.name.split('.'); // wolverine.1.3.jpg
                const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
                const extensionesValidas = ['png','jpg','jpeg','gif'];
                if ( !extensionesValidas.includes( extensionArchivo ) ) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No es una extensión permitida'
                    });
                }
                const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
                const path = `./dist/uploads/${ tipo }/${ nombreArchivo }`;
                // Mover la imagen
                fileField.mv( path , (err) => {
                    if (err){
                        console.log(err)
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error al mover la imagen'
                        });
                    }
                });
                let result = await Actualizar.subir( tipo, id, nombreArchivo );
                if(!result ){
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'No se pude actualizar la imagen',
                        result
                    });
                }
                //console.log(result);
                return res.status(200).send({
                    status: 'success',
                    img: nombreArchivo,
                    mensaje: 'Se actualizo la imagen correctamente',
                    result
                }); 
            }
        }    
       
        
        /*try{
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
        }*/
    }
    
    static async retornaImage(req: Request, res: Response){
        const tipo = req.params.tipo;
        const foto = req.params.foto;

        const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );
        //console.log(pathImg);
        // imagen por defecto
        if ( existsSync( pathImg ) ) {
            res.sendFile( pathImg );
        } else {
            const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
            res.sendFile( pathImg );
        }

    }
}