const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);



export default class validarJwt {
    static async Campo(req, res, next ){
        let token = req.header('x-token');
        if(!token) {
            return res.status(401).send({
                status: 'error',
                error: 'No se ha enviado el token'
            }); 
        } 

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
            console.log(error);
            return res.status(401).send({
                status: 'error',
                mensaje: 'Token invalido'
            }); 
          }


        /*try{
            //const { sub } = await googleVerify(token);
            //console.log(sub);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(payload);
            console.log(userid);
            req.sub = sub;
            next();
        } catch(error) {
            console.log(error);
            return res.status(401).send({
                status: 'error',
                mensaje: 'Token invalido'
            }); 

        }*/
        
    }
} 
