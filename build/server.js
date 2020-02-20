"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LLAMAR AL MODULO DE EXPRESS
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
// LLAMAR A LAS RUTAS DEL SERVIDOR 
const usuario_1 = __importDefault(require("./routes/usuario"));
const login_1 = __importDefault(require("./routes/login"));
const categoria_1 = __importDefault(require("./routes/categoria"));
const producto_1 = __importDefault(require("./routes/producto"));
// CLASE 
class Server {
    constructor() {
        // INICIALIZAR AL MODULO EXPRESS
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // INICIALIZAR EL PUERTO DE EXPRESS
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // PROTECCIÓN DEL BACKEND
        this.app.use(helmet_1.default());
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/cafe';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((sms) => {
            console.log("BDD OK");
        });
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // FECHA DE EXPORACIÓN DEL TOKEN 
        process.env.CADUCIDAD_TOKEN = '48h';
        // SET DE AUTENTICACIÓN
        process.env.SEED = process.env.SEED || "SECRET";
    }
    routes() {
        this.app.use('/api/usuario', usuario_1.default);
        this.app.use('/api/usuario', login_1.default);
        this.app.use('/api/categoria', categoria_1.default);
        this.app.use('/api/producto', producto_1.default);
    }
    start() {
        // INICIALIZAR EL SERVIDOR DE EXPRESS
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO");
        });
    }
}
// INSTANCIAR LA CLASE
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map