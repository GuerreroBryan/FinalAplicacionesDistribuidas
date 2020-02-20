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
const express_1 = require("express");
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const underscore_1 = __importDefault(require("underscore"));
const autenticacion_1 = require("../middleware/autenticacion");
class Usuario {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let desde = req.query.desde || 0;
                desde = Number(desde);
                let limite = req.query.limite || 8;
                limite = Number(limite);
                let usuarioDB = yield usuario_1.default.find().limit(limite).skip(desde);
                let conteo = yield usuario_1.default.countDocuments();
                res.json({
                    usuario: usuarioDB,
                    conteo: conteo
                });
            }
            catch (error) {
                return res.status(400).json({
                    dato: error
                });
            }
        });
    }
    postUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bodycabecera = req.body;
                // INSTANCIA DEL ESQUEMA 
                let usuario = new usuario_1.default({
                    nombre: bodycabecera.nombre,
                    email: bodycabecera.email,
                    password: bcryptjs_1.default.hashSync(bodycabecera.password, 10),
                    role: bodycabecera.role
                });
                let usuarioDB = yield usuario.save();
                usuarioDB.password = null;
                res.json({
                    usuario: usuarioDB
                });
            }
            catch (error) {
                return res.status(400).json({
                    dato: error
                });
            }
        });
    }
    putUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let bodycabecera = underscore_1.default.pick(req.body, ['nombre', 'email', 'password', 'role', 'estado']);
                let usuarioDB = yield usuario_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
                usuarioDB.password = null;
                res.json({
                    usuario: usuarioDB
                });
            }
            catch (error) {
                return res.status(400).json({
                    dato: error
                });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioDB;
            try {
                let idurl = req.params.id;
                usuarioDB = yield usuario_1.default.findByIdAndRemove(idurl);
                res.json({
                    usuario: usuarioDB
                });
            }
            catch (error) {
                if (usuarioDB == null) {
                    return res.status(400).json({
                        codigo: "400",
                        message: "USUARIO NO ENCONTRADO",
                    });
                }
                else {
                    return res.status(400).json({
                        ok: "ERROR",
                        dato: error
                    });
                }
            }
        });
    }
    exponerRutas() {
        //this.router.get('/', [verificaToken,verificaRol],this.getUsuario);
        this.router.get('/', [autenticacion_1.verificaToken, autenticacion_1.verificaRol], this.getUsuario);
        this.router.post('/', [autenticacion_1.verificaToken, autenticacion_1.verificaRol], this.postUsuario);
        this.router.put('/:id', [autenticacion_1.verificaToken, autenticacion_1.verificaRol], this.putUsuario);
        this.router.delete('/:id', [autenticacion_1.verificaToken, autenticacion_1.verificaRol], this.deleteUsuario);
    }
}
const usuario = new Usuario();
exports.default = usuario.router;
//# sourceMappingURL=usuario.js.map