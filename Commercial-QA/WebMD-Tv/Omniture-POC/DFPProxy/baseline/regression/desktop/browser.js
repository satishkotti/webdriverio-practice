var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: "firefox",  // declare browser name here
        // pageLoadStrategy: "normal",
        // ensureCleanSession: "true"
        //applicationCacheEnabled: "false"
    }
    
};
var browser = webdriverio.remote(options);
module.exports = browser;