var LoginPage = require('./../common/pbLogin');
var common = require('./../common/commonLib');
var data = require('./../data/testRunConfig');

describe('PB2 Login Tests', function () {

/*    
    it('should be able to login with pb super user access', function () {

        LoginPage.open();
        LoginPage.username.setValue(data.testData.username);
        LoginPage.password.setValue(data.testData.password);
        LoginPage.submit();
        LoginPage.browser.waitForVisible("#grid-favorites");

        expect(LoginPage.title).to.equal('Dashboard - WebMD PageBuilder');
    });
*/
     it('should be able to login with pb super user access', function () {
         browser.login(data.testData);
         expect(browser.getUrlAndTitle().title).to.equal(data.expectedResults.homepageTitle);
    });

    before( function(){
      browser.addCommand('login', common.login.bind(browser));
      browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
});

});