import socket from 'socket.io';
import assert from 'assert';
import auth from './helpers/auth';
import data from './helpers/formData.json';
import path from 'path';
var graph = require('@microsoft/microsoft-graph-client');

var tempData = data.tempData;
var formData = data.formData;


const jwt = require('jsonwebtoken');

var ObjectId= require('mongodb').ObjectId;

// This is our socketio function
// server = server listening on Port
// mdb = connection to Database
const socketio = (server, mdb) => {

  //global io scope
  var io = socket(server);

  async function callPush(token){
    var gcm = require('node-gcm');

    // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
    var sender = new gcm.Sender('AIzaSyC2b3mcVsGrInLJvfkZxHIOFMH95d8sUKY');

    // Prepare a message to be sent
    var message = new gcm.Message({
      data: { key1: 'msg1' }
    });

    // Specify which registration IDs to deliver the message to
    await mdb.collection('devices').find({}).toArray(await function(err,device){
      assert.equal(err, null);
      sender.send(message, { registrationTokens: [device[0].deviceId] }, function (err, response) {
        if (err) console.error('error:' + err);
      });
    });

  }

  //Socket IO handles
  io.on('connection', function(socket){
    console.info('New connection made with ID: ', socket.id);
    socket.emit('message',
      'Call \'available-commands\' to view your access rights');

    // Serverside client variables
    var isAdmin = false;
    var isDebug = false;
    var access_token = null;

    // Common Functions
    function isValidUser(passed_access_token, initial = false){
      if(access_token && passed_access_token &&
        access_token == passed_access_token &&
        isValidToken(passed_access_token)){
        return true;
      } else if(!initial) {
        socket.emit('message', 'You do not have access to this function');
        return false;
      }
    }
    function isValidToken(passed_access_token){
      if (passed_access_token) {
        var decoded = jwt.decode(passed_access_token);
        var dateNow = new Date();
        if((decoded.exp + '0000') < dateNow.getTime()) {
          return false;
        } else {
          return true;
        }
      }else{
        return false;
      }
    }

    //handle available commands event
    socket.on('available-commands', function(data){
      //check if user is connected
      //return array of commands
      var commands = ['obtain-token', 'available-commands'];
      if(isValidUser(data.access_token, true), isAdmin){
        commands = ['remove-token', 'send-message', 'obtain-history',
          'delete-message'];
      }

      socket.emit('commands', commands);
    });

    //handle login event
    socket.on('obtain-token', async function(data){

      //Case when already logged in
      if (isValidUser(data.access_token, true)){
        socket.emit('error', 'you are already logged in');
        return;
      }

      //Handle when data is passed and not already logged in
      if(data){

        let token;
        try {
          token = await auth.getTokenFromCode(data.token);
          access_token = token.token.access_token;

          await auth.isAdmin(access_token, mdb, (success) => {
            token.email = jwt.decode(token.id_token);
            if(success){
              isAdmin = true;

              socket.emit('message', 'You have logged in as an admin');
              socket.emit('message', 'Obtained Token: listen for \'token\' and \'redirect\'');

              socket.emit('token', {...token, admin : true});
              socket.emit('redirect', 'http://localhost:3000');
            } else {
              socket.emit('token', {...token, admin : false});
              socket.emit('message', 'You have logged in as a client.');
            }
          });
        } catch(error){
          socket.emit('message', 'Authentication caused a big error: ' + error);
        }
        if (data.debug) {

          access_token = data.debug.token;
          isDebug = true;
          isAdmin = data.debug.isAdmin;
          socket.emit('token', access_token);
          socket.emit('admin', isAdmin);
          socket.emit('redirect', data.debug.redirect);
        }
      } else {
        socket.emit('message', 'Please pass a token: { token : token }');
      }
    });

    socket.on('client-refresh', async function(data){
      if(isValidToken(data.access_token)){
        access_token = data.access_token;

        await auth.isAdmin(access_token, mdb, (success) => {
          if(success){
            isAdmin = true;
          }
          socket.emit('message', 'You have refreshed');
        });

        socket.emit('valid-token', true);
      }
    });

    //handle logout event
    socket.on('remove-token', function(data){
      callPush(data.access_token);

      if (isValidUser(data.access_token)){
        access_token = null;
        isAdmin = false;
        socket.emit('message', 'Token has been deleted');
      } else {
        if (data.debug) {
          if (data.debug.isAdmin) {
            access_token = null;
            isAdmin = false;
            socket.emit('send-removed-token', access_token);
          }
        }
        socket.emit('message', 'You must obtain a token before you can remove one.');
      }
    });

    socket.on('submit-deviceid', function(data){
      if(true == true){
        mdb.collection('devices').insert({
          deviceId : data.deviceId,
          email : data.email
        }, function(err){
          assert.equal(err, null);
          console.info('Inserted Device');
        });
      }
    });

    socket.on('request-new-token', async function(data){
      if(data && data.refresh_token){
        var token = await auth.refreshToken(data.refresh_token);
        access_token = token.token.access_token;

        await auth.isAdmin(access_token, mdb, (success) => {

          if(success){
            isAdmin = true;

            socket.emit('message', 'You have logged in as an admin');
            socket.emit('message', 'Obtained Token: listen for \'token\' and \'redirect\'');

            socket.emit('token', {...token, admin : true});
            socket.emit('redirect', 'http://localhost:3000');
          } else {
            socket.emit('token', {...token, admin : false});
            socket.emit('message', 'You have logged in as a client.');
          }
        });

      }
    });

    //handle send message event
    socket.on('send-message', function(data){
      if(isValidUser(data.access_token) && isAdmin){
        //Commands below are for the push notifications
        /*var query = {
          $and: [
            {$or: queryFormat(data.config.years)},
            {$or: queryFormat(data.config.status)},
            {$or: queryFormat(data.config.programme)},
            {$or: queryFormat(data.config['tutor name'])},
            {$or: queryFormat(data.config['hesa date'])}
          ]
        };

        var students = mdb.collection('students');
        students.find(query).toArray(function(err,stu){
          assert.equal(err, null);
          var message = {
            subject: data.subject,
            message: data.message,
            priority: data.config.priority,
          };
        });*/
        const fs = require('fs');
        // file.write(data.file,'../public/fileUplods/0001.txt')
        fs.writeFile(path.join(__dirname, '../public/fileUploads/'+data.config.fileName),data.file, (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;
          // success case, the file was saved
          console.info('File saved!');
        });


        //Save the message in the database//
        mdb.collection('messages').insert({
          config : data.config,
          subject : data.subject,
          message : data.message,
          file : data.config.fileName,
          date : new Date()
        }, function(err){
          assert.equal(err, null);

          //If the submission was successful, send out the new messages
          var history = mdb.collection('messages');
          history.find({}).toArray(function(err,messages){
            assert.equal(err, null);
            socket.emit('history', messages);
          });
          console.info('Inserted Message');

          io.emit('new-message-listener');
        });

        socket.emit('message-submission', 'The message was successfully sent!');
      } else {
        socket.emit('message-submission', 'The message was not successfully sent, please login with an administrator account!');
      }
      if (data.debug) {
        //Assume the user's token is valid
        if (data.debug.isAdmin) {
          socket.emit('srv-message', { success : true,
            message : 'Correct Permissions'});
        } else {
          console.info('Invalid message');
          socket.emit('srv-message', { success : false,
            message : 'Incorrect Permissions' });
        }
      }
    });

    //handle view history event
    socket.on('obtain-history', async function(data){
      if(isValidUser(data.access_token)){
        if(isAdmin){

          //Send all the messages
          var history = mdb.collection('messages');
          history.find({}).toArray(function(err,messages){
            assert.equal(err, null);
            socket.emit('history', messages);
          });

        } else {

          //Send only the messages they're allowed to see
          const client = await graph.Client.init({
            authProvider: (done) => {
              done(null, access_token);
            }
          });

          try{
            const result = await client.api('/me').get();
            var emails = [{'KCL Email': result.mail}, {'KCL Email': result.userPrincipleName}];
            mdb.collection('students').find({ $or: emails}).toArray(function(err, students){
              assert.equal(err, null);
              var student = students[0];
              if(student){
                var query = {
                  $and: [
                    {$or : [{'config.years.0' : { $exists: false }},
                      {'config.years' : '' + student.Year},
                      {'config.years' : 'All'}]},

                    {$or : [{'config.programme.0' : { $exists: false }},
                      {'config.programme' : student.Programme},
                      {'config.programme' : 'All'}]},

                    {$or : [{'config.startDate.0' : { $exists: false }},
                      {'config.startDate' : student['HESA Start'].split('/')[2]},
                      {'config.startDate' : 'All'}]},

                    {$or : [{'config.status.0' : { $exists: false }},
                      {'config.status' : student.Status},
                      {'config.status' : 'All'}]},

                    {$or : [{'config.tutor.0' : { $exists: false }},
                      {'config.tutor' : student['Tutor name']},
                      {'config.tutor' : 'All'}]},
                  ]
                };
                mdb.collection('messages').find(query).toArray(function(err,messages){
                  assert.equal(err, null);
                  socket.emit('history', messages);
                });
              }
            });

          } catch(error){
            console.error(error);
          }

        }
      }else{
        if (data.debug) {
          if (data.debug.isAdmin) {
            socket.emit('srv-message', { success : true,
              message : 'Correct Permissions'});
          } else {
            console.info('Invalid message');
            socket.emit('srv-message', { success : false,
              message : 'Incorrect Permissions' });
          }
        }
      }
    });

    socket.on('request-form-data', function(data){
      if(isValidUser(data.access_token)){
        if(isAdmin){
          socket.emit('form-data', formData);
        }
      }

      if (data.debug) {
        if (data.debug.isAdmin) {
          socket.emit('srv-message', { success : true,
            message : 'Correct Permissions'});
        }else{
          console.info('Not an admin');
          socket.emit('srv-message', { success : false,
            message : 'Incorrect Permissions' });
        }
      }
    });

    //handle delete message event
    socket.on('delete-message', function(data){
      if(isValidUser(data.access_token) && isAdmin){
        var messages = mdb.collection('messages');
        messages.find({_id : ObjectId(data._id)}).toArray(function(err,message){
          assert.equal(err, null);
          if(message.length > 0){
            messages.deleteOne({_id : message[0]._id}).then(function() {
              socket.emit('message', 'The record was deleted');
              io.emit('new-message-listener');
              var history = mdb.collection('messages');
              history.find({}).toArray(function(err,messages){
                assert.equal(err, null);
                socket.emit('history', messages);
              });
            });
          } else {
            socket.emit('message', 'Could not find that record to delete');
          }
        });
      }
      if (data.debug) {
        if (data.debug.isAdmin) {
          socket.emit('srv-message', { success : true,
            message : 'Correct Permissions'});
        }else{
          console.info('Not an admin');
          socket.emit('srv-message', { success : false,
            message : 'Incorrect Permissions' });
        }
      }
    });

    //handle delete message event
    socket.on('delete-admin', function(data){
      if(isValidUser(data.access_token) && isAdmin){
        var admins = mdb.collection('admins');
        admins.find({_id : ObjectId(data._id)}).toArray(function(err,admin){
          assert.equal(err, null);
          if(admin.length > 0){
            socket.emit('admin', 'The record was deleted');
            admins.deleteOne({_id : admin[0]._id}).then(function() {
              var x = mdb.collection('admins');
              x.find({}).toArray(function(err,messages){
                assert.equal(err, null);
                socket.emit('admins', messages);
              });
            });
          } else {
            socket.emit('admin', 'Could not find that record to delete');
          }
        });
      }

      if (data.debug) {
        if (data.debug.isAdmin) {
          socket.emit('srv-message', { success : true,
            message : 'Correct Permissions'});
        }else{
          console.info('Not an admin');
          socket.emit('srv-message', { success : false,
            message : 'Incorrect Permissions' });
        }
      }
    });

    //handle delete message event
    socket.on('add-admin', function(data){
      if(isValidUser(data.access_token) && isAdmin){
        //Check if the email is kcl
        mdb.collection('admins').insert({
          Email : data.email,
          date : data.date,
        }, function(err){
          assert.equal(err, null);

          //If the submission was successful, send out the new messages
          var admins = mdb.collection('admins');
          admins.find({}).toArray(function(err,messages){
            assert.equal(err, null);
            socket.emit('admins', messages);
          });
          console.info('Inserted Admin');
        });
      }
    });

    socket.on('obtain-admins', function(data){
      if(isValidUser(data.access_token)){
        if(isAdmin){
          //Send all the messages
          var admins = mdb.collection('admins');
          admins.find({}).toArray(function(err,messages){
            assert.equal(err, null);
            socket.emit('admins', messages);
          });
        }
      }
    });

  });
};

export default socketio;
