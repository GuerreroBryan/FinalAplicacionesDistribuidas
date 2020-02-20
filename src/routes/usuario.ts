import { Request, Response, Router } from 'express';
import UsuarioModel from '../models/usuario';
import bcrypt from 'bcryptjs';
import undescore from 'underscore';
import {verificaToken,verificaRol} from '../middleware/autenticacion';


class Usuario {
    router: Router;
    constructor() {
        this.router = Router();
        this.exponerRutas();
    }

    async getUsuario(req: Request, res: Response) {
        try {
            let desde = req.query.desde || 0;
            desde = Number(desde);

            let limite = req.query.limite || 8;
            limite = Number(limite);
            let usuarioDB = await UsuarioModel.find().limit(limite).skip(desde);
            let conteo = await UsuarioModel.countDocuments();
            res.json(
                {
                    usuario: usuarioDB,
                    conteo: conteo
                });

        } catch (error) {
            return res.status(400).json(
                {
                    dato: error
                });

        }

    }

    async postUsuario(req: Request, res: Response) {
        try {
            let bodycabecera = req.body;

            // INSTANCIA DEL ESQUEMA 
            let usuario = new UsuarioModel(
                {
                    nombre: bodycabecera.nombre,
                    email: bodycabecera.email,
                    password: bcrypt.hashSync(bodycabecera.password, 10),
                    role: bodycabecera.role

                });

            let usuarioDB: any = await usuario.save();

            usuarioDB.password = null;
            res.json(
                {
                    usuario: usuarioDB
                })
        } catch (error) {
            return res.status(400).json(
                {
                    dato: error
                });

        }

    }
    async putUsuario(req: Request, res: Response) {

        try {
            let idurl = req.params.id;
            let bodycabecera = undescore.pick(req.body, ['nombre', 'email', 'password', 'role', 'estado']);
            let usuarioDB: any = await UsuarioModel.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            usuarioDB.password = null;
            res.json(
                {
                    usuario: usuarioDB
                })

        } catch (error) {

            return res.status(400).json(
                {
                    dato: error
                });

        }

    }

    async deleteUsuario(req: Request, res: Response) {
        let usuarioDB: any;

        try {
            let idurl = req.params.id;
            usuarioDB = await UsuarioModel.findByIdAndRemove(idurl);

            

                res.json(
                    {
                        usuario: usuarioDB
                    })
            
        } catch (error) {

            if (usuarioDB==null) {
                return res.status(400).json(
                    {
                        codigo: "400",
                        message: "USUARIO NO ENCONTRADO",
                    });
            }
            else {
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });
            }

        }
    }


    exponerRutas() {
        //this.router.get('/', [verificaToken,verificaRol],this.getUsuario);
        this.router.get('/', [verificaToken, verificaRol], this.getUsuario);
        this.router.post('/', [verificaToken, verificaRol], this.postUsuario);
        this.router.put('/:id', [verificaToken, verificaRol], this.putUsuario);
        this.router.delete('/:id', [verificaToken, verificaRol], this.deleteUsuario);
    }

}

const usuario = new Usuario();

export default usuario.router
