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
        .type('.name-register', 'Daisy Delete')
        .type('.email-register', 'daisy@mail.com')
        .type('.password-register', 'daisypassword')
        .click('.btn-confirm-register')
        .wait('.btn-wheel')
        .click('.btn-wheel')
        .wait(1000 * 2)
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
        .type('.email-signin', 'daisy@mail.com')
        .type('.password-signin', 'daisypassword')
        .click('.btn-confirm-signin')
        .wait('.btn-wheel')
        .click('.btn-wheel')
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
