var LoginPage = require('./../../elements/aim/login.page');

module.exports.LaunchApp = () => {
        LoginPage.open(global.appUrl_aim);
}

