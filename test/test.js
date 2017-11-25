var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Secure User - User\'s actions', function() {
  
    this.timeout(30000);

    it('should try to login with unregistered email', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'anna@mail.com')
        .type('.password-signin', 'annapassword')
        .click('.btn-confirm-signin')
        .wait(1000 * 3)
        .then(()=>{
            done();
        });
    });

    it('should register a new user then signout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-register')
        .wait(1000 * 2)
        .type('.name-register', 'Anna Walker')
        .type('.email-register', 'anna@mail.com')
        .type('.password-register', 'annapassword')
        .click('.btn-confirm-register')
        .wait('.btn-signout')
        .wait(1000 * 3)
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });

    it('should sign the new user in with a wrong password', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'anna@mail.com')
        .type('.password-signin', 'wrongpassword')
        .click('.btn-confirm-signin')
        .wait(1000 * 3)
        .then(()=>{
            done();
        });
    });

    it('should sign the new user in with the right password then signout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'anna@mail.com')
        .type('.password-signin', 'annapassword')
        .click('.btn-confirm-signin')
        .wait(1000 * 3)
        .then(()=>{
            done();
        });
    });
});
