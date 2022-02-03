"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const googleVerify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub, name, email, picture } = payload;
        return { sub, name, email, picture, sta: true, error: 'Verifiacion valida' };
    }
    catch (error) {
        console.log(error);
        return { sta: false, error: error };
    }
});
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
};
