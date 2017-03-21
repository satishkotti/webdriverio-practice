var test = require('./../common/functions/functions');

describe('Move Activity Queue Menu', () => {
    
    it('Verify whether Queue is present as a separate menu instead of being present as a menu-item under the hamburger menu', () => {
        
        test.LaunchAppAndLogin();

        //Positive assertion
        expect(browser.isExisting('//li[@class="pb-topbar-nav-button" and string()="Queue"]')).to.be.true;

        //Negative assertion
        expect(browser.isExisting('//ul[@class="pb-menu tools"]//li[contains(.,"Queue")]')).to.be.false;
    });

    it('Verify whether user is navigated to Activity Status Queue screen when user clicks on the Queue menu', () => {

        browser.click('//li[@class="pb-topbar-nav-button" and string()="Queue"]');

        var isActivityStatusPageDisplayed =  false;
        browser.waitUntil(function(){

            if(browser.isVisible('#activityGrid'))
            {
                isActivityStatusPageDisplayed = true;
                return browser.isVisible('#activityGrid') == true;
            }
        });

        //assertion
        expect(isActivityStatusPageDisplayed).to.be.true;
    })
});