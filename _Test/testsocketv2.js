const assert = require('assert');
const io = require('socket.io-client');
const socketURL = 'http://localhost:8002/';

// Test login,logout
// Test send message
// Test attach File
// Test send message with file attached
// Test delete messages
// Test history
// Test set preferences

// General test cases on socket.
// i.e Ensuring sockets are connected.
describe('# General socket test', () => {

  let client;
  let count = 0;

  // Before a test, connect a client.
  beforeEach( (done) => {
    client = io.connect(socketURL);
    client.on('connect', () => {
      ++count;
      done();
    });
  });

  // After a test, disconnect that client,
  // was connected in the beforeEach hook.
  afterEach( (done) => {
    client.disconnect();
    --count;
    done();
  });

  // Test beforeEach hook,
  // There should not be 0 sockets because of the beforeEach hook.
  it ('#1 Test beforeEach hook, such that there should not be 0 sockets in server' , (done) => {

    assert.notEqual(count, 0, 'Error, there is zero sockets, which should not happen.');
    done();
  });

  // Test beforeEach hook,
  // There should be at most 1 sockets because of the beforeEach hook.
  it ('#2 At most 1 socket should be in server', (done) => {

    assert.equal(count, 1, 'Error, there is ' + count + ' sockets.');
    done();
  });

  // Test the number of sockets connected to server.
  // There should be 3 sockets when second and third client is connected.
  it ('#3 3 sockets logged in server', (done) => {

    var secondClient = io.connect(socketURL);
    var thirdClient = io.connect(socketURL);
    secondClient.on('connect', () => {
      ++count;
      thirdClient.on('connect', () => {
        ++count;
        assert.equal(count, 3, 'Error, there is ' + count + ' sockets');
        secondClient.disconnect();
        thirdClient.disconnect;
        done();
      });
    });
  });

});
// A suite of test cases for non admins.
describe('# Socket.IO test without admin', () => {

  let client;
  var admin = true;

  beforeEach( (done) => {
    client = io.connect(socketURL);
    client.on('connect', () => {
      client.emit('obtain-token', {debug: {token: 'H534KD', isAdmin: false, redirect: 'http://ggjhggh.co.uk'}});
      client.on('admin', (data) => {
        admin = data;
        done();
      });
    });
  });

  afterEach( () => {
    client.disconnect();
  });
  it ('Admin should be false from beforeEach hook method', (done) => {
    assert.equal(admin, false, 'True!!');
    done();
  });

});
// A suite of test cases for admins.
describe('# Socket.IO test with admin ', () => {
  let client;
  let token;
  let admin;

  beforeEach( (done) => {
    client = io.connect(socketURL);
    client.on('connect', () => {
      client.emit('obtain-token', {debug: {token: 'H534KD', isAdmin: true, redirect: 'http://sdkfsf.co.uk'}});
      client.on('token', (data) => {
        token = data;
        client.on('admin', (data) => {
          admin = data;
          done();
        });
      });
    });
  });

  afterEach( () => {
    client.disconnect();
  });

  // Test if admin is true;
  it ('#1 Admin should be true from beforeEach method', (done) => {
    assert.equal(admin, true, 'Admin is false');
    done();

  });
  // Test to obtain a token,
  // indicating a log in.
  it ('#2 Client should obtain the token token from server by the beforeEach hook', (done) => {

    assert.equal(token, 'H534KD', 'Not the same');
    done();
  });

  // Test to remove a token,
  // indicating a log out.
  // Proves that isValidUser works.
  it ('#3 Token should be null when remove-token is invoked', (done) => {
    client.emit('remove-token', {debug: {token: token, isAdmin: true}});
    client.on('send-removed-token', (data) => {
      token = data;
      //assert.equal(token, null, 'should equal null');
      done();
    });

  });
});
//Testing the sending message listener
describe ('# Socket.IO test - Sending a message with an unauthorized Admin', () =>{
  let unauthorizedAdmin;
  let success;
  let message;


  beforeEach( (done) => {
    unauthorizedAdmin = io.connect(socketURL);
    unauthorizedAdmin.on('connect', () => {
      unauthorizedAdmin.emit('send-message', {debug: {token: 'H534KD', isAdmin: false, redirect: 'http://sdkfsf.co.uk'}});
      unauthorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach( () => {
    unauthorizedAdmin.disconnect();
  });

  //Should fail as the user is not an admin
  it ('#1 Invalid Admin sending a message', (done) => {
    assert.equal(success,false,'success check');
    assert.equal(message,'Incorrect Permissions','message check');
    done();

  });
});
//Sending a message as an authorized admins
describe('# Socket.IO test - Sending a message with an authorizedAdmin', () => {
  let authorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    authorizedAdmin = io.connect(socketURL);
    authorizedAdmin.on('connect', () => {
      authorizedAdmin.emit('send-message', {debug: {token: 'H534KD', isAdmin: true, redirect: 'http://sdkfsf.co.uk'}});
      authorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    authorizedAdmin.disconnect();
  });

  //should succeed as the user is an admin
  it ('#1 valid Admin sending a message', (done) => {
    assert.equal(success,true,'success check');
    console.log(message);
    assert.equal(message,'Correct Permissions','message check');
    done();
  });
});

//authorized admin accessing history
describe('# Socket.IO test - Valid Admin obtaining history', () => {
  let authorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    authorizedAdmin = io.connect(socketURL);
    authorizedAdmin.on('connect', () => {
      authorizedAdmin.emit('obtain-history', {debug: {token: 'H534KD', isAdmin: true, redirect: 'http://sdkfsf.co.uk'}});
      authorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    authorizedAdmin.disconnect();
  });

  it ('#1 valid Admin accessing data', (done) => {
    assert.equal(success,true,'success check');
    assert.equal(message,'Correct Permissions','message check');
    done();
  });

});

//Unauthorized admin obtaining history
describe('# Socket.IO test - Invalid Admin obtaining history', () => {
  let unauthorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    unauthorizedAdmin = io.connect(socketURL);
    unauthorizedAdmin.on('connect', () => {
      unauthorizedAdmin.emit('obtain-history', {debug: {token: 'H534KD', isAdmin: false, redirect: 'http://sdkfsf.co.uk'}});
      unauthorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    unauthorizedAdmin.disconnect();
  });

  it ('#1 valid Admin accessing data', (done) => {
    assert.equal(success,false,'success check');
    assert.equal(message,'Incorrect Permissions','message check');
    done();
  });
});

//Unauthorized admin accessing data
describe('# Socket.IO test - Invalid Admin deleting a message', () => {
  let unauthorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    unauthorizedAdmin = io.connect(socketURL);
    unauthorizedAdmin.on('connect', () => {
      unauthorizedAdmin.emit('delete-message', {debug: {token: 'H534KD', isAdmin: false, redirect: 'http://sdkfsf.co.uk'}});
      unauthorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    unauthorizedAdmin.disconnect();
  });

  it ('#1 valid Admin accessing data', (done) => {
    assert.equal(success,false,'success check');
    assert.equal(message,'Incorrect Permissions','message check');
    done();
  });
});

//authorized admin deleting a message
describe('# Socket.IO test - Valid Admin deleting a message', () => {
  let authorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    authorizedAdmin = io.connect(socketURL);
    authorizedAdmin.on('connect', () => {
      authorizedAdmin.emit('delete-message', {debug: {token: 'H534KD', isAdmin: true, redirect: 'http://sdkfsf.co.uk'}});
      authorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    authorizedAdmin.disconnect();
  });

  it ('#1 valid Admin accessing data', (done) => {
    assert.equal(success,true,'success check');
    assert.equal(message,'Correct Permissions','message check');
    done();
  });
});

//authorized admin uploading data
describe('# Socket.IO test - Valid Admin uploading data', () => {
  let authorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    authorizedAdmin = io.connect(socketURL);
    authorizedAdmin.on('connect', () => {
      authorizedAdmin.emit('attach-file', {debug: {token: 'H534KD', isAdmin: true, redirect: 'http://sdkfsf.co.uk'}});
      authorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    authorizedAdmin.disconnect();
  });

  it ('#1 valid Admin accessing data', (done) => {
    assert.equal(success,true,'success check');
    assert.equal(message,'Correct Permissions','message check');
    done();
  });
});

//unauthorized admin uploading data
describe('# Socket.IO test - Invalid Admin uploading data', () => {
  let unauthorizedAdmin;
  let success;
  let message;

  beforeEach( (done) => {
    unauthorizedAdmin = io.connect(socketURL);
    unauthorizedAdmin.on('connect', () => {
      unauthorizedAdmin.emit('attach-file', {debug: {token: 'H534KD', isAdmin: false, redirect: 'http://sdkfsf.co.uk'}});
      unauthorizedAdmin.on('srv-message', (data) => {
        success = data.success;
        message = data.message;
        done();
      });
    });
  });

  afterEach(() => {
    unauthorizedAdmin.disconnect();
  });

  it ('#1 valid Admin accessing data', (done) => {
    assert.equal(success,false,'success check');
    assert.equal(message,'Incorrect Permissions','message check');
    done();
  });
});

// Testing attaching file
describe('# Socket.IO test - Valid Admin attaching file', () => {
  let authorizedAdmin;
  let success;
  let file;
  let message;

  beforeEach( (done) => {
    authorizedAdmin = io.connect(socketURL);
    authorizedAdmin.on('connect', () => {
      authorizedAdmin.emit('attach-file',{debug: {token: 'H534KD', isAdmin: true, redirect: 'http://sdkfsf.co.uk'}});
      file = '../_test/test.txt';
      authorizedAdmin.on('srv-message', (data) => {
        console.info(file);
        success = data.success;
        message = data.file;
        done();
      });
    });
  });

  afterEach(() => {
    authorizedAdmin.disconnect();
  });

  it ('#1 valid Admin attaching file', (done) => {

    assert.equal(success,true,'File Attached');

    done();
  });
});
