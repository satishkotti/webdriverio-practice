var webdriverio = require('webdriverio');
var client = {
    port: 4723,

    desiredCapabilities: {
        platformName: 'Android',
        platformVersion: '7.1.1',
        deviceName: '3208de5a1424718',
        browserName: 'Chrome',
        appiumVersion: '1.6.4'
        //app: webviewApp
    }
};

module.exports = webdriverio.remote(client) || {};
