import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import Tipo_artController from '../controller/tipo_art';

const routerTipo_art = Router();

// tipo_art
routerTipo_art.post('/api/tipo_art/new', 
    [
        check('cod_tipo', 'Falta el cod_tipo').notEmpty(),
        check('nombre', 'Falta el nombre').notEmpty(),
        Validar.Campo,
    ],
    Tipo_artController.save
); 
routerTipo_art.get('/api/tipo_art/list',Tipo_artController.list); 
routerTipo_art.get('/api/tipo_art/:id',Tipo_artController.detail); 
routerTipo_art.put('/api/tipo_art/:id', Tipo_artController.update);
//router.delete('/tipo_art/:id', Tipo_artController.delete);


export default routerTipo_art;