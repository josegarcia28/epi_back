import { Router} from 'express';
import { check } from 'express-validator';
import UsuarioController from '../controller/usuario';
import  Validar  from '../middlewares/validar-campo';
import validarJwt from '../middlewares/validar-jwt';


const routerUsuario = Router();

routerUsuario.post('/api/usuario/new', 
    [
        check('email', 'Falta el email').notEmpty(),
        check('password', 'Falta el password').notEmpty(),
        Validar.Campo,
    ],
    UsuarioController.save
); 
//routerLogin.get('/api/login/renew',LoginController.renewToken
routerUsuario.put('/api/usuario/update', validarJwt.Campo, UsuarioController.update);

export default routerUsuario;