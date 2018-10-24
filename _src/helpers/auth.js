const credentials = {
  client: {
    id: 'c85f23a3-d93b-45cf-8f2e-d9d6b7dd547e',
    //id: '15793157-5fd9-435d-b0e1-56bc87bcd66d',
    secret: ''
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com/',
    authorizePath: 'kcl.ac.uk/oauth2/v2.0/authorize',
    tokenPath: 'kcl.ac.uk/oauth2/v2.0/token'
  }
};

const oauth2 = require('simple-oauth2').create(credentials);

/* Let the client do this */
function getAuthUrl() {
  const returnVal = oauth2.authorizationCode.authorizeURL({
    //redirect_uri: 'https://gentle-refuge-90119.herokuapp.com',
    redirect_uri: 'http://localhost:8002',
    scope: 'openid email profile offline_access User.Read Mail.Read',
    domain_hint: 'kcl.ac.uk'
  });
  return returnVal;
}

exports.getAuthURL = getAuthUrl;
