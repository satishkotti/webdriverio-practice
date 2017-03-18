var LoginPage = require('./../ui/login');

module.exports = {
    login: (params) => {
        LoginPage.login(params.url, params.username, params.password, '','');

//Add: assert get title and url confirm login successful
    }
}