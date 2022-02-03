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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const bd_1 = require("./bd/bd");
const cors_1 = __importDefault(require("cors"));
const empleado_routes_1 = __importDefault(require("./routes/empleado.routes"));
const articulo_routes_1 = __importDefault(require("./routes/articulo.routes"));
const asignacion_routes_1 = __importDefault(require("./routes/asignacion.routes"));
const tipo_art_routes_1 = __importDefault(require("./routes/tipo_art.routes"));
const detalle_asig_routes_1 = __importDefault(require("./routes/detalle_asig.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const busqueda_routes_1 = __importDefault(require("./routes/busqueda.routes"));
const alamacen_routes_1 = __importDefault(require("./routes/alamacen.routes"));
const stock_routes_1 = __importDefault(require("./routes/stock.routes"));
const subir_routes_1 = __importDefault(require("./routes/subir.routes"));
const entrada_routes_1 = __importDefault(require("./routes/entrada.routes"));
const proveedor_routes_1 = __importDefault(require("./routes/proveedor.routes"));
const detalle_entra_routes_1 = __importDefault(require("./routes/detalle_entra.routes"));
const server = server_1.default.init();
// Configurar CORS
server.app.use((0, cors_1.default)());
server.app.use((req, res, next) => {
    /*res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();*/
    // falta probar estos para cuando el token expire
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
// Rutas
server.app.use(login_routes_1.default);
server.app.use(empleado_routes_1.default);
server.app.use(articulo_routes_1.default);
server.app.use(asignacion_routes_1.default);
server.app.use(tipo_art_routes_1.default);
server.app.use(detalle_asig_routes_1.default);
server.app.use(busqueda_routes_1.default);
server.app.use(alamacen_routes_1.default);
server.app.use(stock_routes_1.default);
server.app.use(subir_routes_1.default);
server.app.use(entrada_routes_1.default);
server.app.use(proveedor_routes_1.default);
server.app.use(detalle_entra_routes_1.default);
server.start(() => {
    bd_1.db.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("BD corriendo");
        try {
            yield bd_1.db.sync({ force: false });
        }
        catch (error) {
            console.log(error.message);
        }
    })).catch((e) => {
        console.log(e.message);
    });
});
