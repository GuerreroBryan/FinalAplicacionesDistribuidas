import { Request, Response, Router } from 'express';

import UsuarioModel from '../models/usuario';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

class Login {
    router: Router;

    constructor() {
        this.router = Router();
        this.exponerRutas();
    }

    postUsuario(req: Request, res: Response) {
        
        let body = req.body;

        console.log(body);

        UsuarioModel.findOne({ email: body.email }, (err: any, usuarioBD: any) => {
            if (err) {
                return res.status(500).json(
                    {
                        dato: err
                    });
            }
            else {
                if (usuarioBD === null) 
                {
                    return res.status(400).json(
                        {
                            dato: "(Usuario) o Contraseña Incorrecto"
                        });
                }

                if (bcrypt.compareSync(body.password, usuarioBD.password) === false) {
                    return res.status(400).json(
                        {
                            dato: "Usuario (Contraseña) Incorrecto"
                        });
                }

                let token = jwt.sign(
                    {
                        usuarioBD: usuarioBD

                    }, "SECRET",
                    {
                        expiresIn: 60*60*24
                    });

                res.json(
                    {
                        ok: true,
                        usuarioBD: usuarioBD,
                        token: token
                    })
            }

        });
    }

    exponerRutas() {
        this.router.post('/login', this.postUsuario);

    }


}


const login = new Login();
export default login.router;