const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    
    return new Promise( ( resolve, reject ) => {
        if ( !token || token.length == 0) {
            reject('token no encontrado')
        }
        try{
            const payload = {
                uid
            };
            jwt.sign(payload, 'Holsdj28397kjHd7@asdyui3897k', {
                expiresIn: '1h'
            }, ( err, token ) => {
                if ( err ) {
                    reject('no se pudo generar el token')
                } else {
                    resolve(token)
                }
            });
        } catch (error) {
           reject('token no valido')
        }
    
    });
     
}

module.exports = {
    generarJWT
}