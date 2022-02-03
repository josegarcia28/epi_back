"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const actualizar_imagen_1 = __importDefault(require("../helpers/actualizar-imagen"));
function isSingleFile(file) {
    return typeof file === 'object' && file.name !== undefined;
}
/*function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
    return Array.isArray(file);
}*/
class CargarFile {
    static subir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tipo = req.params.tipo;
            let id = req.params.id;
            let fileField;
            const tiposValidos = ['articulo', 'empleado', 'usuario'];
            if (!tiposValidos.includes(tipo)) {
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
                    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
                    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
                    if (!extensionesValidas.includes(extensionArchivo)) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'No es una extensión permitida'
                        });
                    }
                    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
                    const path = `./dist/uploads/${tipo}/${nombreArchivo}`;
                    // Mover la imagen
                    fileField.mv(path, (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                ok: false,
                                msg: 'Error al mover la imagen'
                            });
                        }
                    });
                    let result = yield actualizar_imagen_1.default.subir(tipo, id, nombreArchivo);
                    if (!result) {
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
        });
    }
    static retornaImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipo = req.params.tipo;
            const foto = req.params.foto;
            const pathImg = path_1.default.join(__dirname, `../uploads/${tipo}/${foto}`);
            //console.log(pathImg);
            // imagen por defecto
            if ((0, fs_1.existsSync)(pathImg)) {
                res.sendFile(pathImg);
            }
            else {
                const pathImg = path_1.default.join(__dirname, `../uploads/no-img.jpg`);
                res.sendFile(pathImg);
            }
        });
    }
}
exports.default = CargarFile;
