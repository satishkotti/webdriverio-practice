
module.exports.getEnvTestUrl = function()
{
    return global.envSettings.genesys.url;
};

module.exports.getQAPublicationInfo = function()
{
    return global.envSettings.genesys.users[0];
};

module.exports.getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
};

module.exports.login = function (params) {
    /*
        console.log('url:' + params.url);
        console.log('username:'+ params.username);
        console.log('password:'  + params.password);
    */
    this.url(params.url);
    this.element('#username').setValue(params.username);
    this.element('#password').setValue(params.password);
    this.element('#pb-login').submitForm();
    this.waitForVisible("ul.pb-topbar-nav");
    return;
};
