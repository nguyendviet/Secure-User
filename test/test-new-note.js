var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Secure User - New note', function() {
  
    this.timeout(30000);

    it('should register a new user, write some notes then sign out', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-register')
        .wait(1000 * 2)
        .type('.name-register', 'Wilma Writer')
        .type('.email-register', 'wilma@mail.com')
        .type('.password-register', 'wilmapassword')
        .click('.btn-confirm-register')
        .wait('.btn-wheel')
        .click('.btn-wheel')
        .click('.btn-note')
        .type('.note-content', 'This is a new note. Yay!')
        .click('.btn-save-note')
        .wait(1000)
        .type('.note-content', 'This is another note.')
        .click('.btn-save-note')
        .wait(1000)
        .type('.note-content', 'I can keep doing this forever. Muahahahaha!')
        .click('.btn-save-note')
        .wait(1000)
        .scrollTo(500, 0)
        .wait(1000 * 2)
        .click('.btn-wheel')
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });

    it('should register a new user, write some notes then sign out', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-signin')
        .wait(1000 * 2)
        .type('.email-signin', 'wilma@mail.com')
        .type('.password-signin', 'wilmapassword')
        .click('.btn-confirm-signin')
        .wait('.btn-wheel')
        .click('.btn-wheel')
        .click('.btn-note')
        .type('.note-content', 'This is one more note. Wilma out!')
        .click('.btn-save-note')
        .scrollTo(600, 0)
        .wait(1000 * 2)
        .click('.btn-wheel')
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });

    it('should register another new user, write some notes then sign out', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.jumbotron')
        .click('.btn-register')
        .wait(1000 * 2)
        .type('.name-register', 'Brenda Blogger')
        .type('.email-register', 'brenda@mail.com')
        .type('.password-register', 'brendapassword')
        .click('.btn-confirm-register')
        .wait('.btn-wheel')
        .click('.btn-wheel')
        .click('.btn-note')
        .type('.note-content', 'I am another writer.')
        .click('.btn-save-note')
        .wait(1000)
        .type('.note-content', 'This is working.')
        .click('.btn-save-note')
        .wait(1000)
        .scrollTo(500, 0)
        .wait(1000 * 2)
        .click('.btn-wheel')
        .click('.btn-signout')
        .then(()=>{
            done();
        });
    });
});
