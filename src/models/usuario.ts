import {Schema,model}  from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';


let usuarioSchema = new Schema(
    {
        nombre :{
            type : String,
            required: [true,'Nombre es Obligatorio']
        },
        
        email :{
            type : String,
            unique:true,
            required: [true,'Correo es Obligatorio']
        },
        
        password :{
            type : String,
            required: [true,'Password es Obligatorio']
        },
        
        img :{
            type : String,
            require:false
        },
        
        role :{
            type : String,
            default: 'USER_ROL',
            enum:{values:['ADMIN_ESFOT','USER_ROLE'],
                 message:'{VALUE} no es un rol valido'}
        },
        
        estado :{
            type : Boolean,
            default:true

        },
        
        google :{
            type : Boolean,
            default:false
        }
    });


usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser unico'});

export default model('Usuario',usuarioSchema)
