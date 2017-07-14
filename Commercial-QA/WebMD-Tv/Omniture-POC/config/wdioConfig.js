var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
var browser = webdriverio.remote(options);

module.exports = browser;