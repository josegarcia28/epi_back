"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
var morgan = require('morgan');
class Server {
    constructor() {
        this.port = process.env.PORT || '3900';
        this.app = (0, express_1.default)();
        this.app.use(morgan('combined'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    static init() {
        return new Server();
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
}
exports.default = Server;
