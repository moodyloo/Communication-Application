const credentials = {
  client: {
    id: 'api://c85f23a3-d93b-45cf-8f2e-d9d6b7dd547e',
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
    redirect_uri: 'com.communicationapp.redirect',
    scope: 'openid email profile offline_access User.Read Mail.Read',
    domain_hint: 'kcl.ac.uk'
  });
  return returnVal;
}

exports.getAuthURL = getAuthUrl;
