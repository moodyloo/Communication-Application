import { MongoClient } from 'mongodb';
import assert from 'assert';

//db variables
var username = 'root';
var password = 'root';
const dbadd = 'mongodb://' + username + ':' + password + '@ds211088.mlab.com:11088/bluefoxtest';

//Extracting data from data.js
var studentFunctions = require('./Student.js');
var students = studentFunctions.generateStudents();

function addData(data,collection) {
  MongoClient.connect(dbadd, function(err, db){

    if (err) throw err;
    console.info('Database connected');
    db = db.db('bluefoxtest');
    console.info(data);
    //connected
    db.collection(collection).insertMany(data, function(err, result){
      assert.equal(err, null);
      assert.equal(data.length, result.result.n);
      assert.equal(data.length, result.ops.length);
      console.info('Inserted records');
    });
  });
}

addData(students,'students');
