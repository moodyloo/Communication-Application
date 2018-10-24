'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _auth = require('./helpers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _formData = require('./helpers/formData.json');

var _formData2 = _interopRequireDefault(_formData);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graph = require('@microsoft/microsoft-graph-client');

var tempData = _formData2.default.tempData;
var formData = _formData2.default.formData;

var jwt = require('jsonwebtoken');

var ObjectId = require('mongodb').ObjectId;

// This is our socketio function
// server = server listening on Port
// mdb = connection to Database
var socketio = function socketio(server, mdb) {
  var callPush = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token) {
      var gcm, sender, message;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              gcm = require('node-gcm');

              // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)

              sender = new gcm.Sender('AIzaSyC2b3mcVsGrInLJvfkZxHIOFMH95d8sUKY');

              // Prepare a message to be sent

              message = new gcm.Message({
                data: { key1: 'msg1' }
              });

              // Specify which registration IDs to deliver the message to

              _context.t0 = mdb.collection('devices').find({});
              _context.next = 6;
              return function (err, device) {
                _assert2.default.equal(err, null);
                sender.send(message, { registrationTokens: [device[0].deviceId] }, function (err, response) {
                  if (err) console.error('error:' + err);
                });
              };

            case 6:
              _context.t1 = _context.sent;
              _context.next = 9;
              return _context.t0.toArray.call(_context.t0, _context.t1);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function callPush(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  //Socket IO handles


  //global io scope
  var io = (0, _socket2.default)(server);

  io.on('connection', function (socket) {
    console.info('New connection made with ID: ', socket.id);
    socket.emit('message', 'Call \'available-commands\' to view your access rights');

    // Serverside client variables
    var isAdmin = false;
    var isDebug = false;
    var access_token = null;

    // Common Functions
    function isValidUser(passed_access_token) {
      var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (access_token && passed_access_token && access_token == passed_access_token && isValidToken(passed_access_token)) {
        return true;
      } else if (!initial) {
        socket.emit('message', 'You do not have access to this function');
        return false;
      }
    }
    function isValidToken(passed_access_token) {
      if (passed_access_token) {
        var decoded = jwt.decode(passed_access_token);
        var dateNow = new Date();
        if (decoded.exp + '0000' < dateNow.getTime()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }

    //handle available commands event
    socket.on('available-commands', function (data) {
      //check if user is connected
      //return array of commands
      var commands = ['obtain-token', 'available-commands'];
      if (isValidUser(data.access_token, true), isAdmin) {
        commands = ['remove-token', 'send-message', 'obtain-history', 'delete-message'];
      }

      socket.emit('commands', commands);
    });

    //handle login event
    socket.on('obtain-token', function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
        var token;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!isValidUser(data.access_token, true)) {
                  _context2.next = 3;
                  break;
                }

                socket.emit('error', 'you are already logged in');
                return _context2.abrupt('return');

              case 3:
                if (!data) {
                  _context2.next = 20;
                  break;
                }

                token = void 0;
                _context2.prev = 5;
                _context2.next = 8;
                return _auth2.default.getTokenFromCode(data.token);

              case 8:
                token = _context2.sent;

                access_token = token.token.access_token;

                _context2.next = 12;
                return _auth2.default.isAdmin(access_token, mdb, function (success) {
                  token.email = jwt.decode(token.id_token);
                  if (success) {
                    isAdmin = true;

                    socket.emit('message', 'You have logged in as an admin');
                    socket.emit('message', 'Obtained Token: listen for \'token\' and \'redirect\'');

                    socket.emit('token', (0, _extends3.default)({}, token, { admin: true }));
                    socket.emit('redirect', 'http://localhost:3000');
                  } else {
                    socket.emit('token', (0, _extends3.default)({}, token, { admin: false }));
                    socket.emit('message', 'You have logged in as a client.');
                  }
                });

              case 12:
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](5);

                socket.emit('message', 'Authentication caused a big error: ' + _context2.t0);

              case 17:
                if (data.debug) {

                  access_token = data.debug.token;
                  isDebug = true;
                  isAdmin = data.debug.isAdmin;
                  socket.emit('token', access_token);
                  socket.emit('admin', isAdmin);
                  socket.emit('redirect', data.debug.redirect);
                }
                _context2.next = 21;
                break;

              case 20:
                socket.emit('message', 'Please pass a token: { token : token }');

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 14]]);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    socket.on('client-refresh', function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!isValidToken(data.access_token)) {
                  _context3.next = 5;
                  break;
                }

                access_token = data.access_token;

                _context3.next = 4;
                return _auth2.default.isAdmin(access_token, mdb, function (success) {
                  if (success) {
                    isAdmin = true;
                  }
                  socket.emit('message', 'You have refreshed');
                });

              case 4:

                socket.emit('valid-token', true);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }());

    //handle logout event
    socket.on('remove-token', function (data) {
      callPush(data.access_token);

      if (isValidUser(data.access_token)) {
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

    socket.on('submit-deviceid', function (data) {
      if (true == true) {
        mdb.collection('devices').insert({
          deviceId: data.deviceId,
          email: data.email
        }, function (err) {
          _assert2.default.equal(err, null);
          console.info('Inserted Device');
        });
      }
    });

    socket.on('request-new-token', function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
        var token;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(data && data.refresh_token)) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 3;
                return _auth2.default.refreshToken(data.refresh_token);

              case 3:
                token = _context4.sent;

                access_token = token.token.access_token;

                _context4.next = 7;
                return _auth2.default.isAdmin(access_token, mdb, function (success) {

                  if (success) {
                    isAdmin = true;

                    socket.emit('message', 'You have logged in as an admin');
                    socket.emit('message', 'Obtained Token: listen for \'token\' and \'redirect\'');

                    socket.emit('token', (0, _extends3.default)({}, token, { admin: true }));
                    socket.emit('redirect', 'http://localhost:3000');
                  } else {
                    socket.emit('token', (0, _extends3.default)({}, token, { admin: false }));
                    socket.emit('message', 'You have logged in as a client.');
                  }
                });

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }());

    //handle send message event
    socket.on('send-message', function (data) {
      if (isValidUser(data.access_token) && isAdmin) {
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
        var fs = require('fs');
        // file.write(data.file,'../public/fileUplods/0001.txt')
        fs.writeFile(_path2.default.join(__dirname, '../public/fileUploads/' + data.config.fileName), data.file, function (err) {
          // throws an error, you could also catch it here
          if (err) throw err;
          // success case, the file was saved
          console.info('File saved!');
        });

        //Save the message in the database//
        mdb.collection('messages').insert({
          config: data.config,
          subject: data.subject,
          message: data.message,
          file: data.config.fileName,
          date: new Date()
        }, function (err) {
          _assert2.default.equal(err, null);

          //If the submission was successful, send out the new messages
          var history = mdb.collection('messages');
          history.find({}).toArray(function (err, messages) {
            _assert2.default.equal(err, null);
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
          socket.emit('srv-message', { success: true,
            message: 'Correct Permissions' });
        } else {
          console.info('Invalid message');
          socket.emit('srv-message', { success: false,
            message: 'Incorrect Permissions' });
        }
      }
    });

    //handle view history event
    socket.on('obtain-history', function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data) {
        var history, client, result, emails;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!isValidUser(data.access_token)) {
                  _context5.next = 22;
                  break;
                }

                if (!isAdmin) {
                  _context5.next = 6;
                  break;
                }

                //Send all the messages
                history = mdb.collection('messages');

                history.find({}).toArray(function (err, messages) {
                  _assert2.default.equal(err, null);
                  socket.emit('history', messages);
                });

                _context5.next = 20;
                break;

              case 6:
                _context5.next = 8;
                return graph.Client.init({
                  authProvider: function authProvider(done) {
                    done(null, access_token);
                  }
                });

              case 8:
                client = _context5.sent;
                _context5.prev = 9;
                _context5.next = 12;
                return client.api('/me').get();

              case 12:
                result = _context5.sent;
                emails = [{ 'KCL Email': result.mail }, { 'KCL Email': result.userPrincipleName }];

                mdb.collection('students').find({ $or: emails }).toArray(function (err, students) {
                  _assert2.default.equal(err, null);
                  var student = students[0];
                  if (student) {
                    var query = {
                      $and: [{ $or: [{ 'config.years.0': { $exists: false } }, { 'config.years': '' + student.Year }, { 'config.years': 'All' }] }, { $or: [{ 'config.programme.0': { $exists: false } }, { 'config.programme': student.Programme }, { 'config.programme': 'All' }] }, { $or: [{ 'config.startDate.0': { $exists: false } }, { 'config.startDate': student['HESA Start'].split('/')[2] }, { 'config.startDate': 'All' }] }, { $or: [{ 'config.status.0': { $exists: false } }, { 'config.status': student.Status }, { 'config.status': 'All' }] }, { $or: [{ 'config.tutor.0': { $exists: false } }, { 'config.tutor': student['Tutor name'] }, { 'config.tutor': 'All' }] }]
                    };
                    mdb.collection('messages').find(query).toArray(function (err, messages) {
                      _assert2.default.equal(err, null);
                      socket.emit('history', messages);
                    });
                  }
                });

                _context5.next = 20;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5['catch'](9);

                console.error(_context5.t0);

              case 20:
                _context5.next = 23;
                break;

              case 22:
                if (data.debug) {
                  if (data.debug.isAdmin) {
                    socket.emit('srv-message', { success: true,
                      message: 'Correct Permissions' });
                  } else {
                    console.info('Invalid message');
                    socket.emit('srv-message', { success: false,
                      message: 'Incorrect Permissions' });
                  }
                }

              case 23:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[9, 17]]);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }());

    socket.on('request-form-data', function (data) {
      if (isValidUser(data.access_token)) {
        if (isAdmin) {
          socket.emit('form-data', formData);
        }
      }

      if (data.debug) {
        if (data.debug.isAdmin) {
          socket.emit('srv-message', { success: true,
            message: 'Correct Permissions' });
        } else {
          console.info('Not an admin');
          socket.emit('srv-message', { success: false,
            message: 'Incorrect Permissions' });
        }
      }
    });

    //handle delete message event
    socket.on('delete-message', function (data) {
      if (isValidUser(data.access_token) && isAdmin) {
        var messages = mdb.collection('messages');
        messages.find({ _id: ObjectId(data._id) }).toArray(function (err, message) {
          _assert2.default.equal(err, null);
          if (message.length > 0) {
            messages.deleteOne({ _id: message[0]._id }).then(function () {
              socket.emit('message', 'The record was deleted');
              io.emit('new-message-listener');
              var history = mdb.collection('messages');
              history.find({}).toArray(function (err, messages) {
                _assert2.default.equal(err, null);
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
          socket.emit('srv-message', { success: true,
            message: 'Correct Permissions' });
        } else {
          console.info('Not an admin');
          socket.emit('srv-message', { success: false,
            message: 'Incorrect Permissions' });
        }
      }
    });

    //handle delete message event
    socket.on('delete-admin', function (data) {
      if (isValidUser(data.access_token) && isAdmin) {
        var admins = mdb.collection('admins');
        admins.find({ _id: ObjectId(data._id) }).toArray(function (err, admin) {
          _assert2.default.equal(err, null);
          if (admin.length > 0) {
            socket.emit('admin', 'The record was deleted');
            admins.deleteOne({ _id: admin[0]._id }).then(function () {
              var x = mdb.collection('admins');
              x.find({}).toArray(function (err, messages) {
                _assert2.default.equal(err, null);
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
          socket.emit('srv-message', { success: true,
            message: 'Correct Permissions' });
        } else {
          console.info('Not an admin');
          socket.emit('srv-message', { success: false,
            message: 'Incorrect Permissions' });
        }
      }
    });

    //handle delete message event
    socket.on('add-admin', function (data) {
      if (isValidUser(data.access_token) && isAdmin) {
        //Check if the email is kcl
        mdb.collection('admins').insert({
          Email: data.email,
          date: data.date
        }, function (err) {
          _assert2.default.equal(err, null);

          //If the submission was successful, send out the new messages
          var admins = mdb.collection('admins');
          admins.find({}).toArray(function (err, messages) {
            _assert2.default.equal(err, null);
            socket.emit('admins', messages);
          });
          console.info('Inserted Admin');
        });
      }
    });

    socket.on('obtain-admins', function (data) {
      if (isValidUser(data.access_token)) {
        if (isAdmin) {
          //Send all the messages
          var admins = mdb.collection('admins');
          admins.find({}).toArray(function (err, messages) {
            _assert2.default.equal(err, null);
            socket.emit('admins', messages);
          });
        }
      }
    });
  });
};

exports.default = socketio;
//# sourceMappingURL=socketio.js.map