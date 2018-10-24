'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/* Let the server do this */
var getTokenFromCode = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(auth_code) {
    var result, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return oauth2.authorizationCode.getToken({
              code: auth_code,
              redirect_uri: 'https://gentle-refuge-90119.herokuapp.com',
              //redirect_uri: 'http://localhost:8002',
              scope: ['openid', 'email', 'profile', 'offline_access', 'User.Read', 'Mail.Read']
            });

          case 2:
            result = _context.sent;
            token = oauth2.accessToken.create(result);
            return _context.abrupt('return', token);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTokenFromCode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isAdmin = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(access_token, mdb, callback) {
    var client, result, emails, admins;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return graph.Client.init({
              authProvider: function authProvider(done) {
                done(null, access_token);
              }
            });

          case 2:
            client = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return client.api('/me').get();

          case 6:
            result = _context2.sent;
            emails = [result.mail, result.userPrincipleName];
            _context2.next = 10;
            return mdb.collection('admins');

          case 10:
            admins = _context2.sent;
            _context2.t0 = admins.find({});
            _context2.next = 14;
            return function (err, stu) {
              _assert2.default.equal(err, null);
              for (var student in stu) {
                for (var email in emails) {
                  if (stu[student].Email == emails[email]) {
                    callback(true);
                    return;
                  }
                }
              }
              callback(false);
              return;
            };

          case 14:
            _context2.t1 = _context2.sent;

            _context2.t0.toArray.call(_context2.t0, _context2.t1);

            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t2 = _context2['catch'](3);

            callback(false);
            return _context2.abrupt('return');

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 18]]);
  }));

  return function isAdmin(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var refreshToken = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(refresh_token) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return oauth2.accessToken.create({ refresh_token: refresh_token }).refresh();

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function refreshToken(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//APP_SCOPES=openid profile offline_access User.Read Mail.Read
//REDIRECT_URI=http://localhost:3000/authorize

var credentials = {
  client: {
    //id: 'c85f23a3-d93b-45cf-8f2e-d9d6b7dd547e',
    //secret: 'amzcNLD296#@qeiGYPE48{^',
    id: '15793157-5fd9-435d-b0e1-56bc87bcd66d',
    secret: 'qbbVRC704+gycbLSEQ27~*;'
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com/',
    authorizePath: 'kcl.ac.uk/oauth2/v2.0/authorize',
    tokenPath: 'kcl.ac.uk/oauth2/v2.0/token'
  }
};

var oauth2 = require('simple-oauth2').create(credentials);
var jwt = require('jsonwebtoken');
var graph = require('@microsoft/microsoft-graph-client');

exports.getTokenFromCode = getTokenFromCode;
exports.isAdmin = isAdmin;
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.js.map