const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);



const googleVerify = async( token ) => {
  try{
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;
    return { sub, name, email, picture, sta: true, error:'Verifiacion valida' };

  } catch(error) {
    console.log(error);
    return { sta: false, error: error };
  }

}
  
  //const userid = payload['sub'];
  //console.log(payload);

/*const googleVerify = async( token ) => {
  const ticket = await client.atta  .verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  //const userid = payload['sub'];
  //console.log(payload);
  const { sub, name, email, picture } = payload;

  return { sub, name, email, picture };
}*/



module.exports = {
  googleVerify
}