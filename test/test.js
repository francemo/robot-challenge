var request = require('supertest');
var app = require('../app');

//describe('GET /', function() {
//  it('respond to /', function(done) {
//    request(app)
//      .get('/')
//      .expect(200, done);
//  });
//});

describe('POST /', function(){

    this.timeout(180000);

        it('search "apple"', function(done){
            request(app)
            .post('/')
            .send("word=apple")
            .expect(200)
            .end(function(err, res){
                if(err) return done(err);
                done();
            });
        });

    it('search "middle"', function(done){
        request(app)
        .post('/')
        .send("word=middle")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "yellow"', function(done){
        request(app)
        .post('/')
        .send("word=yellow")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "red"', function(done){
        request(app)
        .post('/')
        .send("word=red")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "oxygen"', function(done){
        request(app)
        .post('/')
        .send("word=oxygen")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "people"', function(done){
        request(app)
        .post('/')
        .send("word=people")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "queue"', function(done){
        request(app)
        .post('/')
        .send("word=queue")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "move"', function(done){
        request(app)
        .post('/')
        .send("word=move")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "depend"', function(done){
        request(app)
        .post('/')
        .send("word=depend")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "ice"', function(done){
        request(app)
        .post('/')
        .send("word=ice")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "usually"', function(done){
        request(app)
        .post('/')
        .send("word=usually")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "wife"', function(done){
        request(app)
        .post('/')
        .send("word=wife")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
    
    it('search "zebra"', function(done){
        request(app)
        .post('/')
        .send("word=zebra")
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        });
    });
});

