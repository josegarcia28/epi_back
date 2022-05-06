"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const empleado_1 = __importDefault(require("../controller/empleado"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const routerEmpleado = (0, express_1.Router)();
// empleado
routerEmpleado.get('/api/empleado/list', validar_jwt_1.default.Campo, empleado_1.default.list);
routerEmpleado.post('/api/empleado/new', [
    (0, express_validator_1.check)('cod_emp', 'Falta el cod_emp').notEmpty(),
    (0, express_validator_1.check)('nombre', 'Falta el nombre').notEmpty(),
    (0, express_validator_1.check)('estatus', 'Falta el estatus').notEmpty(),
    /*check('t_calzado', 'Falta el t_calzado').notEmpty(),
    check('t_pantalon', 'Falta el t_pantalon').notEmpty(),
    check('t_camiseta', 'Falta el t_camiseta').notEmpty(),
    check('t_guante', 'Falta el t_guante').notEmpty(),*/
    validar_jwt_1.default.Campo
], empleado_1.default.save);
routerEmpleado.get('/api/empleado/:id', empleado_1.default.detail);
//routerEmpleado.get('/api/empleado/infoEmpleAsig',EmpleadoController.infoEmpleAsig); 
//routerEmpleado.get('/api/empleado/:tabla/:busqueda', BusquedaController.getTodo); 
routerEmpleado.put('/api/empleado/:id', validar_jwt_1.default.Campo, empleado_1.default.update);
exports.default = routerEmpleado;
