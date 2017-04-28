var menus = require('./menus.actions');


module.exports.GoToRedirectToolPage = function(option) {
    menus.GoToRedirectTool()
}

module.exports.GetPageTitle = function(option) {
    return browser.getText("div.row > div:nth-of-type(1) > section.pb-module > header > h3");
}