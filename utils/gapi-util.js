const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token) {
    let payload;
    try {
        let ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        payload = ticket.getPayload();  
    } catch (error) {
        console.log(error);
        return {sucess: false};
    }
    if(payload)
        return {success: true, payload: payload};
}

async function signOut(token){
    
}

module.exports= {verify,signOut};