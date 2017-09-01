var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: "chrome" // declare browser name here
    }
};
var browser = webdriverio.remote(options);
function Page () {
}

Page.prototype.open = function (url) {
    //browser.windowHandleMaximize('current');
    browser.url(url);

}



module.exports = new Page()
