var maxWaitTimeInMs = 60000;

module.exports = {
    login: function(url, username, password, repository, domain){
            browser.url(url);
            browser.waitForVisible("#login_username-input", maxWaitTimeInMs);
            browser.element('#login_username-input').setValue(username);
            browser.element('#login_password-input').setValue(password);
            browser.click('#Login-button button.x-btn-text');
            browser.waitForVisible("#menuDownArrow-button", maxWaitTimeInMs);
        }
}