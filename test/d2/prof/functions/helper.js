var maxWaitInMs = 20000;

module.exports.getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
};

module.exports.getEnvTestUrl = function()
{
    return global.envSettings.d2prof.url;
};

module.exports.getQAPublicationUserInfo = function()
{
    return global.envSettings.d2prof.users[0];
};

module.exports.login = function (browser, params) {
  
    browser.url(params.url);
    browser.waitForVisible("#login_username-input",20000);
    browser.element('#login_username-input').setValue(params.username);
    browser.element('#login_password-input').setValue(params.password);
    browser.click('#Login-button button.x-btn-text');
    browser.waitForVisible("#menuDownArrow-button",20000);
    return;
};

module.exports.isFindByIdExists = function(browser){

    browser.waitForExist("//div[@id='tab-container-0']//span[text()='Find']/parent::*", maxWaitInMs);
    return browser.isExisting("//div[@id='tab-container-0']//span[text()='Find']/parent::*");

}