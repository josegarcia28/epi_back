import { Router} from 'express';
import { check } from 'express-validator';
import  Validar  from '../middlewares/validar-campo';
import ProveedorController from '../controller/proveedor';

const routerProveedor = Router();

// Proveedor
routerProveedor.post('/api/proveedor/new', 
    [
        check('cif_pro', 'Falta el CIF de la empresa').notEmpty(),
        check('nombre', 'Falta el nombre de la empresa').notEmpty(),
        check('descripcion', 'Falta el descripcion').notEmpty(),
        check('direccion', 'Falta el direccion proveedor').notEmpty(),
        Validar.Campo,
    ],
    ProveedorController.save
); 
routerProveedor.put('/api/proveedor/:id', ProveedorController.update);
routerProveedor.get('/api/proveedor/list',ProveedorController.list); 
routerProveedor.get('/api/proveedor/:id',ProveedorController.detail); 
//router.delete('/tipo_art/:id', Tipo_artController.delete);

export default routerProveedor;