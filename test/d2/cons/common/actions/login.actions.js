var LoginPage = require('./../ui/login');

module.exports = {
    login: function(params) {
        LoginPage.login(params.url, params.username, params.password, '','');
        expect(browser.getTitle()).to.equal(global.d2ConDataSettings.expectedResults.HomePageTitle);
    }
}