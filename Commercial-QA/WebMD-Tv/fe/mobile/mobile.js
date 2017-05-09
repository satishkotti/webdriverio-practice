var webdriverio = require('webdriverio');

console.log('testing_mocha');
describe('Verify title on device', function () {
    this.timeout(0);
    var client = {
        port: 4723,

        desiredCapabilities: {
            platformName: 'Android',
            platformVersion: '5.0',
            deviceName: '3208de5a1424718',
            browserName: 'Chrome',
            //appiumVersion: '1.6.4'
            //app: webviewApp
        }
    };

    var driver = {};
    before(function () {
        // load the driver for browser
        driver = webdriverio.remote(client);
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
