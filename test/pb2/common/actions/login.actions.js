var LoginPage = require('./../elements/login.page');

module.exports.Login = function()
{
        LoginPage.open();
        LoginPage.username.setValue('QAPublication');
        LoginPage.password.setValue('QA-Doc#1');
        LoginPage.submit();
        LoginPage.browser.waitForVisible("#grid-favorites");

        expect(LoginPage.title).to.equal('Dashboard - WebMD PageBuilder');
}