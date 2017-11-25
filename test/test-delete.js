var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Secure User - Delete account', function() {
  
    this.timeout(30000);

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

    it('should sign the new user, try cancel delete then delete user', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'anna@mail.com')
        .type('.password-signin', 'annapassword')
        .click('.btn-confirm-signin')
        .wait('.btn-edit')
        .click('.btn-edit')
        .click('.btn-delete-account')
        .wait(1000 * 2)
        .click('.btn-cancel-delete-account')
        .wait(1000 * 2)
        .click('.btn-delete-account')
        .wait(1000 * 2)
        .click('.btn-confirm-delete-account')
        .wait(1000 * 2)
        .then(()=>{
            done();
        });
    });
});
