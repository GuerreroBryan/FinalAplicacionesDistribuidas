
import {Schema,model}  from 'mongoose';

let categoriaSchema = new Schema(
    {
        nombre :{
            type : String,
            required: [true,'Nombre es Obligatorio']
        },
        
        usuario :{
            type : Schema.Types.ObjectId,
            ref:"Usuario"
        }
    });


export default model('Categoria',categoriaSchema);