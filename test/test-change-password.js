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
        .type('.name-register', 'Beatrice Brown')
        .type('.email-register', 'beatrice@mail.com')
        .type('.password-register', 'beatricepassword')
        .click('.btn-confirm-register')
        .wait('.btn-wheel')
        .click('.btn-wheel')
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
        .type('.email-signin', 'beatrice@mail.com')
        .type('.password-signin', 'beatricepassword')
        .click('.btn-confirm-signin')
        .wait('.btn-wheel')
        .click('.btn-wheel')
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
        .type('.email-signin', 'beatrice@mail.com')
        .type('.password-signin', 'beatricepassword')
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
        .type('.email-signin', 'beatrice@mail.com')
        .type('.password-signin', 'newpassword')
        .click('.btn-confirm-signin')
        .wait('.btn-wheel')
        .click('.btn-wheel')
        .wait(1000 * 3)
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });
});
