var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Secure User - Change password', function() {
  
    this.timeout(30000);

    it('should register a new user, try changing password with unmatched passwords then sign out', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-register')
        .wait(1000 * 2)
        .type('.name-register', 'Anna Walker')
        .type('.email-register', 'anna@mail.com')
        .type('.password-register', 'annapassword')
        .click('.btn-confirm-register')
        .wait('.btn-edit')
        .click('.btn-edit')
        .type('.password-new1', 'newpassword')
        .type('.password-new2', 'wrongpassword')
        .click('.btn-save-password')
        .wait(1000 * 3)
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });

    it('should sign the new user, change password then sign out', (done)=>{
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
        .type('.password-new1', 'newpassword')
        .type('.password-new2', 'newpassword')
        .click('.btn-save-password')
        .wait(1000 * 3)
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });

    it('should sign the user in with the old password', (done)=>{
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

    it('should sign the user in with the new password then sign out', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'anna@mail.com')
        .type('.password-signin', 'newpassword')
        .click('.btn-confirm-signin')
        .wait('.btn-signout')
        .wait(1000 * 3)
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });
});
