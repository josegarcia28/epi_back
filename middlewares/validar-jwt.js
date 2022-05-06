const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');


export default class validarJwt {
    static async Campo(req, res, next ){
        let token = req.header('x-token');
        let tipo = req.header('tipo');
        if(token === 'undefined' || !token) {
            return res.status(200).send({
                status: false,
                error: 'No se ha enviado el token'
            }); 
        } 
        if(tipo === 'google'){
            try{
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID,  
                });
                const payload = ticket.getPayload();
                const { sub, name, email, picture } = payload;
                req.sub = sub;
                next();
            } catch(error) {
                return res.status(200).send({
                    status: false,
                    mensaje: 'Token invalido1'
                }); 
            }
        } else {
                try{
                    console.log('singoo');
                    const { uid } = jwt.verify(token, 'Holsdj28397kjHd7@asdyui3897k');
                    req.uid = uid;
                    next();
                } catch (error) {
                    console.log(error);
                    return res.status(200).send({
                        status: false,
                        mensaje: 'Token invalido2'
                    }); 
                }
        }
        
    }
} 
