var LoginPage = require('./../elements/login.page');

module.exports.LaunchApp = () =>
{
        LoginPage.open(global.appUrl);
}

module.exports.Login = (user, pass) => {

        LoginPage.username.setValue(user);
        LoginPage.password.setValue(pass);
        LoginPage.submit();
        LoginPage.browser.waitForVisible("#grid-favorites");
}

module.exports.GetCurrentSite = () =>
{
        return browser.execute( () => {
                return $('label:contains("Site:") option[selected="selected"]').get(0).textContent;
        }).value;
}