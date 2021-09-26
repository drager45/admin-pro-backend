const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');

    //Validacion de token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        //Validacion de nuestro token
        const { uid } = jwt.verify(token, process.env.JWT_SECRET );
        console.log(uid);
        //En este caso vamos a regresar el uid que se obtiene de nuestro token
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}


module.exports = {
    validarJWT
}