var LoginPage = require('./../../common/d2Login');
var common = require('./../../common/d2commonlib');
var data = require('./../../data/d2testRunConfig');

describe('D2 Login', function () {

 it('should be able to login with d2 super user access', function () {
         browser.login(data.testData);
         expect(browser.getUrlAndTitle().title).to.equal(data.expectedResults.homepageTitle);
    });

    before( function(){
        browser.addCommand('login', common.login.bind(browser));
        browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
        browser.setViewportSize({
            width: 1024,
            height: 768
        });
});

});