import { Request, Response, Router } from 'express';


import CategoriaModel from '../models/categoria';
import UsuarioModel from '../models/usuario'
import ProductoModel from '../models/producto'

import { verificaToken, verificaRol } from '../middleware/autenticacion';


class Producto {
    router: Router;
    constructor() {
        this.router = Router();
        this.exponerRutas();
    }

    async getProducto(req: Request, res: Response) 
    {
        try 
        {
            let productoBD = await ProductoModel.find({}).sort('nombre').exec();
            UsuarioModel.populate(productoBD, { path: "usuario", select: 'nombre' });
            CategoriaModel.populate(productoBD, { path: "categoria", select: 'nombre' });
            let conteo = await ProductoModel.countDocuments();
            res.json(
                {
                    productos: productoBD,
                    conteo: conteo
                });
        } catch (error) 
        {
            return res.status(400).json(
                {
                    dato: error
                });
        }
    }

    async postProducto(req: any, res: Response) 
    {
        try {
            let bodycabecera = req.body;
            let producto = new ProductoModel(
                {
                    nombre: bodycabecera.nombre,
                    precioUni:bodycabecera.precioUni,
                    descripcion:bodycabecera.descripcion,
                    categoria:bodycabecera.categoria,
                    usuario: req.usuario
        
                });
                let productoBD = await producto.save();
                res.json(
                    {
                        producto: productoBD
                    });
            
        } catch (error) 
        {
            return res.status(500).json(
                {
                    dato: error
                });  
        }
}

    async getProductoId(req: Request, res: Response) 
    {
        try 
        {
            let idurl = req.params.id;
            let productoBD= await ProductoModel.findById(idurl);
            productoBD= await UsuarioModel.populate(productoBD, {path: "usuario"});
            productoBD = await CategoriaModel.populate(productoBD, { path: "categoria", select: 'nombre'});
            res.json(
                {
                    ok: true,
                    producto: productoBD
                });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    ok: false,
                    dato: "Producto no encontrado",
                    message: error
                }); 
        }
    }

    async putProducto(req: Request, res: Response) 
    {
        try 
        {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let categoriaBD = await ProductoModel.findByIdAndUpdate(idurl, bodycabecera,{ new: true, runValidators: true, context: 'query' });
            res.json(
                {
                    categoria: categoriaBD
                });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });
        }
    }

    async deleteProducto(req: Request, res: Response) 
    {
        try 
        {
            let idurl = req.params.id;
            let productoBD = await ProductoModel.findByIdAndRemove(idurl);
            res.json(
                {
                    mensaje: "PRODUCTO ELIMINADO",
                    producto: productoBD
                });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    message: "PRODUCTO NO ENCONTRADO",
                    dato: error
                });
            
        }
    }

        exponerRutas() {
            this.router.get('/', [verificaToken, verificaRol],this.getProducto);
            this.router.get('/:id', [verificaToken, verificaRol], this.getProductoId);
            this.router.post('/', [verificaToken, verificaRol], this.postProducto);
            this.router.put('/:id', [verificaToken, verificaRol], this.putProducto);
            this.router.delete('/:id', [verificaToken, verificaRol], this.deleteProducto);

        }
    }

    const producto = new Producto();
    export default producto.router;