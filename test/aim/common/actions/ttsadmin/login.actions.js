var LoginPage = require('./../../elements/ttsadmin/login.page');

module.exports.LaunchApp = () => {
        LoginPage.open(global.appUrl_ttsAdmin);
}

module.exports.Login = (user, pass) => {
        LoginPage.username.setValue(user);
        LoginPage.password.setValue(pass);
        LoginPage.login.click();
}

module.exports.Logout = () => {

       LoginPage.logout.click();
        browser.pause(1000);
  
}