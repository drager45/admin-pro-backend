/*
    Ruta: /api/usuarios
*/

//Para poder configurar nuestras rutas vamos a utilizar a express
//importando el Router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
//este es un metodo que se encuentra dentro de express
const router = Router();

//Servicio para recuperar la informacion de todos los usuarios
router.get('/', validarJWT, getUsuarios);

//En esta ruta vamos a ocupar lo que acabamos de instalar para poder validar
//que todos los campos obligatorios lleguen
//Hasta este punto solo hemos utilizados lo middleware
//que son funciones que se ejecutan antes de llegar a otras
//otra funcion que tienen es validar que la informacion llegue como se espera
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ]
    , crearUsuario);


//para este proceso vamos requerir enviar el Id de nuestro usuario a actualizar
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario);

//Para nuestro metodo de borrado de informacion lo definiremos de la siguiente forma
router.delete('/:id', validarJWT , borrarUsuario);


//Se programa la ruta para nuestro login


//Generamos una exportacion de nuestro modulo Router
//esta es una exportacion por defecto 
module.exports = router;
