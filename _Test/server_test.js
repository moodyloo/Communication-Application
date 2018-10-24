var request = require('supertest');

describe ('Status and contents', function() {
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve('../_server/server')];
    server = require('../_server/server');
  });
  afterEach(function(done) {
    server.close(done);

  });

  it('Responds', function(done) {
    request(server)
      .get('/*')
      .expect(200);
    done();
  });

});
