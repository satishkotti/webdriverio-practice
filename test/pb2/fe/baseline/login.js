var LoginPage = require('./../../common/pbLogin');
var common = require('./../../common/commonLib');

describe('PB2 Login', function () {

     it('should be able to login with pb super user access', function () {
         browser.login({
            url: common.getEnvTestUrl(),
            username: common.getQAPublicationInfo().username,
            password: common.getQAPublicationInfo().password
        });
         expect(browser.getUrlAndTitle().title).to.equal(global.dataSettings.homepageTitle);
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