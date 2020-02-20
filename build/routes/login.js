"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Login {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    postUsuario(req, res) {
        let body = req.body;
        console.log(body);
        usuario_1.default.findOne({ email: body.email }, (err, usuarioBD) => {
            if (err) {
                return res.status(500).json({
                    dato: err
                });
            }
            else {
                if (usuarioBD === null) {
                    return res.status(400).json({
                        dato: "(Usuario) o Contraseña Incorrecto"
                    });
                }
                if (bcryptjs_1.default.compareSync(body.password, usuarioBD.password) === false) {
                    return res.status(400).json({
                        dato: "Usuario (Contraseña) Incorrecto"
                    });
                }
                let token = jsonwebtoken_1.default.sign({
                    usuarioBD: usuarioBD
                }, "SECRET", {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    ok: true,
                    usuarioBD: usuarioBD,
                    token: token
                });
            }
        });
    }
    exponerRutas() {
        this.router.post('/login', this.postUsuario);
    }
}
const login = new Login();
exports.default = login.router;
//# sourceMappingURL=login.js.map