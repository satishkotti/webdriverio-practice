var LoginPage = require('./../elements/login.page');

module.exports.Login = function()
{

        LoginPage.open();
        LoginPage.username.setValue('QAPbUser09');
        LoginPage.password.setValue('Complexwordsforaccounts!');
        LoginPage.submit();
        LoginPage.browser.waitForVisible("#grid-favorites");

        //expect(LoginPage.title).to.equal('Dashboard - WebMD PageBuilder');
}

module.exports.GetCurrentSite = () =>
{
        return browser.execute( () => {
                return $('label:contains("Site:") option[selected="selected"]').get(0).textContent;
        }).value;
}