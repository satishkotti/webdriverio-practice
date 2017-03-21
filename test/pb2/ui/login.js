var LoginPage = require('./../common/pbLogin');

describe('PB2 Login', function () {
    it('should login with pb super user access PPE-#####', function () {

        LoginPage.open();
        LoginPage.username.setValue('QAPbUser09');
        LoginPage.password.setValue('Complexwordsforaccounts!');
        LoginPage.submit();
        LoginPage.browser.waitForVisible("#grid-favorites");

        expect(LoginPage.title).to.equal('Dashboard - WebMD PageBuilder');
    });

     it('Invalid username and password should fail access should fail PPE-#####', function () {

        LoginPage.open();
        LoginPage.username.setValue('InvalidUser');
        LoginPage.password.setValue('InvalidPass');
        LoginPage.submit();
        LoginPage.browser.waitForVisible(".pb-login-error");


       // expect(LoginPage.failLoginText).to.be.true;
    });
});