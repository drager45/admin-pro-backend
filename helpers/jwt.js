const jwt = require('jsonwebtoken');

//Para nuestra funcion que se estara encargando de generar nuestro token
//la vamos a convertir en una promesa o en su defecto que regrese una promesa
const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {
        
        const payload =  {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });

    });

}

module.exports =  {
    generarJWT
}