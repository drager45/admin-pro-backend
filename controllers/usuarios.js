//Para poder contar con la ayuda del autocompletado agregamos lo siguiente
const { response } = require('express');
const bcryptjs = require('bcryptjs');

//Para poder usar nuestro modelo realizamos lo siguiente
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    //nuestra respuesta puede ser  un string, number o un objeto
    //es mas comun responder un objeto.
    //si queremos agregar el estatus de nuestra peticion para probar 
    //los estatus podemos agregar lo siguiente res.status(400).json({

    //para completar nuestro servicio de getUsuarios vamos a realizar lo siguiente:
    const usuarios = await Usuario.find({}, 'nombre email role google ');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}


const crearUsuario = async (req, res = response) => {
    //para poder leer el body de la peticion 
    const { password, email } = req.body;

    //Vamos a validar el alta de un nuevo usuario
    //en el caso de que ocurra un error vamos a manejar la excepcion
    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        //Despues de recuperar la informacion de nuestro body vamos 
        //a utilizar nuestro modelo para guardar la informacion
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        //El salt será un umero generado de manera aleatorio para poder  
        //encriptar nuestro pass, para esta encriptación no podremos recuperar 
        //el valor original de nuestra contraseña ya que será de una sola vía 
        const salt = bcryptjs.genSaltSync(); // Seleccionamos esta opción para no tener que utilizar un await 
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar los logs'
        });
    }
}


const actualizarUsuario = async (req, res = response) => {
    //TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        // Vamos agregar los (...) para recuperar la informacion como la teniamos, 
        // pero de esta forma podemos recuperar cierta informacion, por que lo que estamos realizando 
        //es desestructurando la variable campos
        const { password, google, email,  ...campos} = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        // con estos comando podemos borrar data que se manda en la peticion 
        // y que no se quiere actualizar en la base, con el cambio que se agrego 
        // arriba este codigo ya no seria necesario
        //delete campos.password;
        //delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario= async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}