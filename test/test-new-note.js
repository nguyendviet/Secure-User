var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Secure User - New note', function() {
  
    this.timeout(30000);

    it('should sign in, write a note then save', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'wilma@mail.com')
        .type('.password-signin', 'wwww')
        .click('.btn-confirm-signin')
        .wait('.btn-wheel')
        .click('.btn-wheel')
        .click('.btn-write')
        .type('.note-content', 'This is a new note. Yay!')
        .click('.btn-save-note')
        .then(()=>{
            done();
        });
    });
});
