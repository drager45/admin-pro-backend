//Este sera un modelo de mongoose
const { Schema, model } = require('mongoose');

//Es la relacion que se tiene con la tabla
const UsuarioSchema = Schema({
    //Lo primero que se debe realizar es definir cada una de las columnas 
    //para despues agregar las propiedades que van a tener
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }, 
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Para evitar que nuestra informacion regrese con el _id, vamos a modificar el nombre
//de esta columna con la siguiente configuracion
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;

})

//Ahora pasamos a implementar nuestro modelo
//de esta forma vamos a exponer nuestro modelo
module.exports = model( 'Usuario', UsuarioSchema);
