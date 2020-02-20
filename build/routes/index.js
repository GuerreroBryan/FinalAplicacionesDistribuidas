"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// LLAMAR AL MODULO DE EXPRESS
const express_1 = require("express");
class Index {
    constructor() {
        // INICIALIZAR AL MODULO EXPRESS
        this.router = express_1.Router();
        this.exponerRutas();
    }
    exponerRutas() {
        this.router.get('/');
    }
}
const index = new Index();
index.exponerRutas();
exports.default = index.router;
