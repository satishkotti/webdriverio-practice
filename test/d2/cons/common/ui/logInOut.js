var maxWaitTimeInMs = 500000;

module.exports = {
    login: function(url, username, password, repository, domain){
            browser.url(url);
            browser.waitForVisible("#login_username-input", maxWaitTimeInMs);
            browser.element('#login_username-input').setValue(username);
            browser.element('#login_password-input').setValue(password);
            browser.click('#Login-button button.x-btn-text');
            browser.waitForVisible("#menuDownArrow-button", maxWaitTimeInMs);
        },
    loginWithNewWindow:function(url, username, password, repository, domain){
            browser.newWindow(url,'NewWindow');
            browser.windowHandleMaximize('NewWindow'); 
            browser.waitForVisible("#login_username-input", maxWaitTimeInMs);
            browser.element('#login_username-input').setValue(username);
            browser.element('#login_password-input').setValue(password);
            browser.click('#Login-button button.x-btn-text');
            browser.waitForVisible("#menuDownArrow-button", maxWaitTimeInMs);
        },
    logoutCloseWindow: function(){
        browser.waitForVisible('//*[@id="*menuUser"]//button',maxWaitTimeInMs);
        browser.click('//*[@id="*menuUser"]//button');
        browser.waitForVisible('#menuUserLogout', maxWaitTimeInMs);
        browser.click('#menuUserLogout');
        browser.waitForVisible("#login_username-input", maxWaitTimeInMs);
        browser.close();
        browser.pause(5000);
    }
}