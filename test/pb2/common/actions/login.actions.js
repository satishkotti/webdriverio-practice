var LoginPage = require('./../elements/login.page');

var logout = "//header//div/ul/li[text() = 'Logout']";
var headerMenu = "//header//div";

module.exports.LaunchApp = () => {
        LoginPage.open(global.appUrl);
}

module.exports.Login = (user, pass, site) => {

        let testSite;
        switch (site) {
                case undefined:
                        testSite = global.site;
                        break;

                default:
                        testSite = site;
                        break;
        }

        LoginPage.username.setValue(user);
        LoginPage.password.setValue(pass);
        if(testSite != 'WebMD Desktop') { LoginPage.site.selectByAttribute('label', testSite); };
        LoginPage.login.click();
        LoginPage.browser.waitForVisible("#grid-favorites");
}

module.exports.GetCurrentSite = () => {
        return browser.execute(() => {
                return $('label:contains("Site:") option[selected="selected"]').get(0).textContent;
        }).value;
}

module.exports.Logout = () => {
        browser.element(headerMenu).click();
        browser.element(logout).click();
        LoginPage.username.waitForVisible();
}