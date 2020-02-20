"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
let usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Correo es Obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Password es Obligatorio']
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        default: 'USER_ROL',
        enum: { values: ['ADMIN_ESFOT', 'USER_ROLE'],
            message: '{VALUE} no es un rol valido' }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
usuarioSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe de ser unico' });
exports.default = mongoose_1.model('Usuario', usuarioSchema);
//# sourceMappingURL=usuario.js.map