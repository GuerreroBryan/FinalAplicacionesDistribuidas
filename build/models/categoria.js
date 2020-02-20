"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let categoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario"
    }
});
exports.default = mongoose_1.model('Categoria', categoriaSchema);
//# sourceMappingURL=categoria.js.map