//importamos el paquete
const mongoose = require('mongoose');

//nuestro metodo es de tipo Async, para poder trabajar 
//con nuestras promesas de forma asincrona
//para que nos regrese una promesa y podamos trabajar de foma sincrona
const dbConnection = async () => {
    try {
        //con el await podemos decir que se debe esperar hasta que 
        //todo lo que tenemos se ejecute para poder trabajar de manera 
        //sincrona
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB ver logs');
    }

}

//para poder utilizar nuestra conexion de base de datos fuera de este
//archivo debemos configurar el export de nuestro objeto quedando
//de la siguiente forma
module.exports = {
    dbConnection
}