//Imports
import express from 'express';
import socketio from './socketio';
import path from 'path';

var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
const username = config.testDatabase.username;
const password = config.testDatabase.password;


//Setup Server Configuration
const port = config.port;
const server = express();

const dbadd = 'mongodb://' + username + ':' + password + '@ds211088.mlab.com:11088/bluefoxtest';

const live = server.listen(port, () => {
  console.info('Server Running on Port:', port);
});

//Middleware and addins
server.use(express.static('public'));
server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
}); //Serves the static files in public folder


MongoClient.connect(dbadd, function(err, db){

  if (err) throw err;
  console.info('Database created');
  db = db.db('bluefoxtest');
  socketio(live, db);

});
