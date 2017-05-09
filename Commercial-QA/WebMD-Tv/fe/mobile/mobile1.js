var webdriverio = require('webdriverio');
var driver = require('./client');
console.log('testing_mocha');
describe('Verify title on device', function () {
    this.timeout(0);

    before(function () {
        // load the driver for browser
        return driver.init();
    });


    it('should return some network traffic', function (done) {

        return driver
            .url('http://www.google.com').then(function () {
               return driver.getTitle().then(function (title) {
                    console.log('Title was: ' + title);
                })

            })

            .end();
    })
})
