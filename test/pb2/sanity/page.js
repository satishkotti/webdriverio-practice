var LoginPage = require('./../common/pbLogin');
var common = require('./../common/commonLib');
var data = require('./../data/testRunConfig');

describe('PB2 ', function () {

    it('should be able to login with pb super user access', function () {
        
        throw new Error("Test Incomplete");
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