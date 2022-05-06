import {unlinkSync, existsSync} from 'fs';
import { Usuario } from '../models/usuario';
import { Empleado } from '../models/empleado';
import { Articulo } from '../models/articulo';


const borrarImagen = ( path: string ) => {
    if ( existsSync( path ) ) {
        // borrar la imagen anterior
        unlinkSync( path );
    }
}

export default class Actualizar {

    static async subir(tipo: string, id: string, nombreArchivo: string):Promise<boolean>{
        let pathViejo = '';
        let status: boolean = false;
        switch( tipo ) {
            case 'articulo':
                try{
                    let rArt: any = await Articulo.findOne({
                        where: { cod_art: id}
                    });
                    if ( !rArt ) {
                        console.log('No existe el codigo del articulo');
                    }
                    pathViejo = `./uploads/articulo/${ rArt.img }`;

                    if(rArt.img != null || rArt.img != ''){
                        borrarImagen( pathViejo );
                    }

                    let rGuardar = await Articulo.update({img: nombreArchivo}, {
                        where: { cod_art: id}
                    });
                    if(rGuardar){
                        status = true;
                    } else {
                        console.log('No se pudo actualizar el articulo');
                    }
                } catch (error){
                    status = false;
                    console.log(error);
                    console.log('error en la actualización');        
                }
            break;
            case 'empleado':
                try{
                    let rEmp: any = await Empleado.findOne({
                        where: { cod_emp: id}
                    });
                    if ( !rEmp ) {
                        console.log('No existe el codigo del Empleado');
                    }
                    pathViejo = `./uploads/empleado/${ rEmp.img }`;
                    if(rEmp.img != '' || rEmp.img.length != 0){
                        borrarImagen( pathViejo );
                    }
                    
                    let rGuardar = await Empleado.update({img: nombreArchivo}, {
                        where: { cod_emp: id}
                    });

                    if(rGuardar){
                        status = true;
                    } else {
                        console.log('No se pudo actualizar el Empleado');
                    }
                } catch (error){
                    status = false;
                    console.log(error);
                    console.log('error en la actualización');               
                }
            break; 
            case 'usuario':
                try{
                    let rEmp: any = await Usuario.findOne({
                        where: { email: id}
                    });
                    if ( !rEmp ) {
                        console.log('No existe el email del Empleado');
                    }
                    pathViejo = `./uploads/usuario/${ rEmp.img }`;
                    if(rEmp.img != '' || rEmp.img.length != 0){
                        borrarImagen( pathViejo );
                    }
                    let rGuardar = await Usuario.update({img: nombreArchivo}, {
                        where: { email: id}
                    });
                    
                    if(rGuardar){
                        status = true;
                    } else {
                        console.log('No se pudo actualizar el Empleado');
                    }
                } catch (error){
                    status = false;
                    console.log(error);
                    console.log('error en la actualización');               
                }
            break;
        }
        return status;
    }
}

