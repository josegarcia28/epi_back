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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const empleado_1 = require("../models/empleado");
const articulo_1 = require("../models/articulo");
const borrarImagen = (path) => {
    if ((0, fs_1.existsSync)(path)) {
        // borrar la imagen anterior
        (0, fs_1.unlinkSync)(path);
    }
};
class Actualizar {
    static subir(tipo, id, nombreArchivo) {
        return __awaiter(this, void 0, void 0, function* () {
            let pathViejo = '';
            let status = false;
            switch (tipo) {
                case 'articulo':
                    try {
                        let rArt = yield articulo_1.Articulo.findOne({
                            where: { cod_art: id }
                        });
                        if (!rArt) {
                            console.log('No existe el codigo del articulo');
                        }
                        pathViejo = `./uploads/articulo/${rArt.img}`;
                        if (rArt.img != null || rArt.img != '') {
                            borrarImagen(pathViejo);
                        }
                        let rGuardar = yield articulo_1.Articulo.update({ img: nombreArchivo }, {
                            where: { cod_art: id }
                        });
                        if (rGuardar) {
                            status = true;
                        }
                        else {
                            console.log('No se pudo actualizar el articulo');
                        }
                    }
                    catch (error) {
                        status = false;
                        console.log(error);
                        console.log('error en la actualización');
                    }
                    break;
                case 'empleado':
                    try {
                        let rEmp = yield empleado_1.Empleado.findOne({
                            where: { cod_emp: id }
                        });
                        if (!rEmp) {
                            console.log('No existe el codigo del Empleado');
                        }
                        pathViejo = `./uploads/empleado/${rEmp.img}`;
                        if (rEmp.img != '' || rEmp.img.length != 0) {
                            borrarImagen(pathViejo);
                        }
                        let rGuardar = yield empleado_1.Empleado.update({ img: nombreArchivo }, {
                            where: { cod_emp: id }
                        });
                        if (rGuardar) {
                            status = true;
                        }
                        else {
                            console.log('No se pudo actualizar el Empleado');
                        }
                    }
                    catch (error) {
                        status = false;
                        console.log(error);
                        console.log('error en la actualización');
                    }
                    break;
                case 'usuario':
                    break;
            }
            return status;
        });
    }
}
exports.default = Actualizar;
