var LoginPage = require('./../ui/logInOut');

module.exports = {
    login: function(params) {
        LoginPage.login(params.url, params.username, params.password, '','');
        //expect(browser.getTitle()).to.equal(global.d2ConDataSettings.expectedResults.HomePageTitle);
    },
    loginWithNewWindow: function(params){
        LoginPage.loginWithNewWindow(params.url, params.username, params.password, '','');
        expect(browser.getTitle()).to.equal(global.d2ConDataSettings.expectedResults.HomePageTitle);
    },
    logoutCloseWindow: function(){
        LoginPage.logoutCloseWindow();
    }
}