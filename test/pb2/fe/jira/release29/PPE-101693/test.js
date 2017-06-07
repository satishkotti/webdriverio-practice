var assert = require('assert');
const Promise = require('bluebird');
var test = require('./../../../../common/functions/functions');
var redirectActions = require("./../../../../common/actions/redirecttool.actions");
var websites = [3, 8, 7, , 9];
describe('PPE-101693: Ability to Export all Redirects', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();

        console.log('browser '+ browser.desiredCapabilities.chromeOptions.prefs.download.default_directory);
        console.log('gbl ' + global.browserDownloadPath);
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it('Export redircet for WebMD', function() {        
        browser.selectByValue("span.pb-buttongroup.floatright > select", websites[0]);
        browser.waitForVisible("section.pb-notification-container.success");        
        browser.pause(5000);
    });
});