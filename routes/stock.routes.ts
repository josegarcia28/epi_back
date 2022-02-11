import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import StockController from '../controller/stock';

const routerStock = Router();


// Stock
routerStock.post('/api/stock/new', 
    [
        check('cod_art', 'Falta el cod_art').notEmpty(),
        check('cod_alm', 'Falta el cod_alm').notEmpty(),
        check('cantidad', 'Falta el cantidad').notEmpty(),
        Validar.Campo,
    ],
    StockController.save
); 
routerStock.get('/api/stock/list',StockController.list); 
//routerStock.get('/api/stock/busq',StockController.buscar); 
routerStock.get('/api/stock/:id',StockController.detail); 
routerStock.put('/api/stock', StockController.update);
//routerStock.delete('/Stock/:id', StockController.delete);*/

export default routerStock;