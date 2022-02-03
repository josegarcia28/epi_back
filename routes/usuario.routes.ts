/*import { Router} from 'express';
import { check } from 'express-validator';
import LoginController from '../controller/login';
import  Validar  from '../middlewares/validar-campo';
import validarJwt from '../middlewares/validar-jwt';


const routerLogin = Router();

routerLogin.post('/api/login/google', 
    [
        check('token', 'Falta el token de google').notEmpty(),
        Validar.Campo,
    ],
    LoginController.SignIn
); 
routerLogin.get('/api/login/renew',LoginController.renewToken
); 
export default routerLogin;*/