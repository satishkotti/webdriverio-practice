var LoginPage = require('./../../elements/salesforce/login.page');

module.exports.LaunchApp = () => {
        LoginPage.open(global.appUrl_salesforce ); // opening the url for sales force
}

module.exports.Login = (user, pass) => {
        LoginPage.username.setValue(user);
        LoginPage.password.setValue(pass);
        LoginPage.login.click();
        LoginPage.Validationlogin();
      
}

module.exports.Logout = () => {

       LoginPage.logout.click();
        browser.pause(1000); 
}