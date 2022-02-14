import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import EmpleadoController from '../controller/empleado';
import validarJwt from '../middlewares/validar-jwt';
import BusquedaController from '../controller/busqueda';

const routerEmpleado = Router();


// empleado
routerEmpleado.get('/api/empleado/list', validarJwt.Campo, EmpleadoController.list); 
routerEmpleado.post('/api/empleado/new',
    [
        check('cod_emp', 'Falta el cod_emp').notEmpty(),
        check('nombre', 'Falta el nombre').notEmpty(),
        check('apellido', 'Falta el apellido').notEmpty(),
        check('t_calzado', 'Falta el t_calzado').notEmpty(),
        check('t_pantalon', 'Falta el t_pantalon').notEmpty(),
        check('t_camiseta', 'Falta el t_camiseta').notEmpty(),
        check('t_guante', 'Falta el t_guante').notEmpty(),
        Validar.Campo,
        validarJwt.Campo
    ],
    EmpleadoController.save
); 
routerEmpleado.get('/api/empleado/:id',EmpleadoController.detail); 
//routerEmpleado.get('/api/empleado/infoEmpleAsig',EmpleadoController.infoEmpleAsig); 
//routerEmpleado.get('/api/empleado/:tabla/:busqueda', BusquedaController.getTodo); 
routerEmpleado.put('/api/empleado/:id', validarJwt.Campo, EmpleadoController.update);

export default routerEmpleado;