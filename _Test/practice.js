// Test login,logout
// Test send message
// Test attach File
// Test send message with file attached
// Test delete messages
// Test history
// Test set preferences

var io = require('socket.io-client');
var socketURL = 'http://localhost:8002/';

//test io connection works
describe('Test IO connection', function(){
  it('send message to client', function(done){
    var client1Socket =  io(socketURL);
    client1Socket.on('connect',function(){
      console.log(client1Socket);
      done();
    });
  });
});


// describe('Test view history', function(){
//   beforeEach(function(done){
//     //setup client
//     var client1Socket =  io(socketURL);
//     client1Socket.on('connect',function(){
//       done();
//     });
//   });
//   afterEach(function(done){
//     //test condition
//     done();
//   });
// });
