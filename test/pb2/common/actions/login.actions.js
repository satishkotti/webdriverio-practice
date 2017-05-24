var LoginPage = require('./../elements/login.page');

module.exports.LaunchApp = () =>
{
        LoginPage.open(global.appUrl);
}

module.exports.Login = (user, pass, website) => {

        LoginPage.username.setValue(user);
        LoginPage.password.setValue(pass);
        if(website !=null){
                LoginPage.select('Site',website);
        }
        LoginPage.submit();
        LoginPage.browser.waitForVisible("#grid-favorites");
}

module.exports.GetCurrentSite = () =>
{
        return browser.execute( () => {
                return $('label:contains("Site:") option[selected="selected"]').get(0).textContent;
        }).value;
}