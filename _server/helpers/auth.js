//APP_SCOPES=openid profile offline_access User.Read Mail.Read
//REDIRECT_URI=http://localhost:3000/authorize

const credentials = {
  client: {
    id: 'c85f23a3-d93b-45cf-8f2e-d9d6b7dd547e',
    secret: 'amzcNLD296#@qeiGYPE48{^',
    //id: '15793157-5fd9-435d-b0e1-56bc87bcd66d',
    //secret: 'qbbVRC704+gycbLSEQ27~*;',
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com/',
    authorizePath: 'kcl.ac.uk/oauth2/v2.0/authorize',
    tokenPath: 'kcl.ac.uk/oauth2/v2.0/token'
  }
};

const oauth2 = require('simple-oauth2').create(credentials);
const jwt = require('jsonwebtoken');
var graph = require('@microsoft/microsoft-graph-client');


import assert from 'assert';

/* Let the server do this */
async function getTokenFromCode(auth_code) {
  let result = await oauth2.authorizationCode.getToken({
    code: auth_code,
    //redirect_uri: 'https://gentle-refuge-90119.herokuapp.com',
    redirect_uri: 'http://localhost:8002',
    scope: ['openid', 'email', 'profile', 'offline_access', 'User.Read', 'Mail.Read']
  });

  const token = oauth2.accessToken.create(result);

  return token;
}

async function isAdmin(access_token, mdb, callback){

  const client = await graph.Client.init({
    authProvider: (done) => {
      done(null, access_token);
    }
  });

  try{
    const result = await client.api('/me').get();
    var emails = [result.mail, result.userPrincipleName];
    var admins = await mdb.collection('admins');
    admins.find({}).toArray(await function(err,stu){
      assert.equal(err, null);
      for(var student in stu){
        for(var email in emails){
          if(stu[student].Email == emails[email]){
            callback(true);
            return;
          }
        }
      }
      callback(false);
      return;
    });
  } catch(error) {
    callback(false);
    return;
  }
}

async function refreshToken(refresh_token){
  return await oauth2.accessToken.create({refresh_token: refresh_token}).refresh();
}

exports.getTokenFromCode = getTokenFromCode;
exports.isAdmin = isAdmin;
exports.refreshToken = refreshToken;
