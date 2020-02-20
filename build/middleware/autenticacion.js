"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// FUNCIÓN PARA VERIFICAR EL TOKEN 
exports.verificaToken = (req, res, next) => {
    let token = req.get('token');
    jsonwebtoken_1.default.verify(token, "SECRET", (err, decode) => {
        if (err) {
            return res.status(401).json({
                dato: err
            });
        }
        else {
            req.usuario = decode.usuarioBD;
            next();
        }
    });
};
// FUNCIÓN PARA VERIFICAR EL ROL 
exports.verificaRol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === "ADMIN_ESFOT") {
        req.usuario = usuario;
        next();
    }
    else {
        return res.status(400).json({
            dato: "NO ES UN ADMIN"
        });
    }
};
//# sourceMappingURL=autenticacion.js.map