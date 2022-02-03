import { Router} from 'express';
import fileUpload from 'express-fileupload';
import CargarFile from '../controller/subir';
import validarJwt from '../middlewares/validar-jwt';

const routerSubir = Router();
routerSubir.use(fileUpload())

routerSubir.put('/api/subir/:tipo/:id', validarJwt.Campo, CargarFile.subir );
routerSubir.get('/api/subir/:tipo/:foto', CargarFile.retornaImage);


export default routerSubir;