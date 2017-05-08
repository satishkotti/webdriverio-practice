var maxWaitTimeInMs = 900000;

module.exports = {
    login: function(url, username, password, repository, domain){
            browser.url(url);
            browser.waitForVisible("#login_username-input", maxWaitTimeInMs);
            browser.element('#login_username-input').setValue(username);
            browser.element('#login_password-input').setValue(password);
            browser.click('#Login-button button.x-btn-text');
            browser.waitForVisible("#menuDownArrow-button", maxWaitTimeInMs);
        },
        logout:function(){
            browser.click("#menuUser-button");
            browser.waitForVisible("//a[@id='menuUserLogout']",maxWaitTimeInMs);
            browser.click("//a[@id='menuUserLogout']");
            browser.waitForVisible("#login_username-input", maxWaitTimeInMs);
        }
}