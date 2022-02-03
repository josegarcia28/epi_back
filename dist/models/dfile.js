"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filex = void 0;
class Filex {
    constructor(name, data, size, encoding, tempFilePath, truncated, mimetype, md5, mv) {
        this.name = name;
        this.data = data;
        this.size = size;
        this.encoding = encoding;
        this.tempFilePath = tempFilePath;
        this.truncated = truncated;
        this.mimetype = mimetype;
        this.md5 = md5;
        this.mv = mv;
    }
}
exports.Filex = Filex;
