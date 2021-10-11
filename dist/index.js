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
//import "reflect-metadata";
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./routes/router"));
const bd_1 = require("./bd/bd");
/*import dotenv from 'dotenv';
dotenv.config();*/
const server = server_1.default.init();
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.app.use(router_1.default);
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
