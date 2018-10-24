'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socketio = require('./socketio');

var _socketio2 = _interopRequireDefault(_socketio);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = require('mongodb').MongoClient; //Imports

var config = require('./config');
var username = config.testDatabase.username;
var password = config.testDatabase.password;

//Setup Server Configuration
var port = config.port;
var server = (0, _express2.default)();

var dbadd = 'mongodb://' + username + ':' + password + '@ds211088.mlab.com:11088/bluefoxtest';

var live = server.listen(port, function () {
  console.info('Server Running on Port:', port);
});

//Middleware and addins
server.use(_express2.default.static('public'));
server.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
}); //Serves the static files in public folder


MongoClient.connect(dbadd, function (err, db) {

  if (err) throw err;
  console.info('Database created');
  db = db.db('bluefoxtest');
  (0, _socketio2.default)(live, db);
});
//# sourceMappingURL=server.js.map