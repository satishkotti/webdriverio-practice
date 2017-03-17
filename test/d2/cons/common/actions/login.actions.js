var LoginPage = require('./../ui/login');

module.exports = {
    login: (params) => {
        LoginPage.login(params.url, params.username, params.password, '','');
    }
}