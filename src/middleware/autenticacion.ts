import { Request, Response,NextFunction, Router } from 'express';

import jwt from 'jsonwebtoken';


// FUNCIÓN PARA VERIFICAR EL TOKEN 
export const verificaToken = (req:any,res:Response,next:NextFunction)=>
{
    let token:any = req.get('token');

    jwt.verify(token,"SECRET",(err:any,decode:any)=>
        {
            if (err) {
                return res.status(401).json(
                    {
                        dato: err
                    });
            }
            else 
            {
            
                req.usuario = decode.usuarioBD;
            
                next();

            }
        });
};


// FUNCIÓN PARA VERIFICAR EL ROL 
export const  verificaRol=(req:any,res:Response,next:NextFunction)=>
{
    let usuario= req.usuario;

    if(usuario.role==="ADMIN_ESFOT")
    {
        req.usuario = usuario;

        next();
    }
    else{
        return res.status(400).json(
            {
                dato: "NO ES UN ADMIN"
            });
    }

};

