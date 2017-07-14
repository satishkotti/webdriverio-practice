var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
var browser = webdriverio.remote(options);

module.exports = browser;