var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var randomstring = require("randomstring");
var info = null;

function deleteRedirects(from) {
    if (browser.element("//a[text()='Show Criteria']").isVisible())
        browser.click("//a[text()='Show Criteria']");
    redirectActions.SearchFromUrl(from);
    browser.element("//table[@role='grid']").waitForVisible();
    browser.pause(4000);
    if (browser.element("//tbody[@role='rowgroup']/tr[1]/td[1]").isVisible()) {
        browser.element("//tbody[@role='rowgroup']/tr[1]/td[1]").click();
        if (browser.isVisible("//button[contains(text(), 'Delete')]")) {
            // click delete button
            browser.element("//button[contains(text(), 'Delete')]").leftClick();
            //confirm delete
            browser.element('//*[@id="modal-ok"]').leftClick();
            browser.waitForVisible("section.pb-notification-container.success");
        }
    }
}

function getValidRedirect() {
    var data = [];
    var fromUrlPattern = "http://www." + global.testEnv + ".webmd.com/food*";
    //redirectActions.GoToRedirectToolPage();
    redirectActions.SearchFromUrl(fromUrlPattern);
    browser.waitForVisible("//tbody[@role='rowgroup']/tr[1]/td[3]/a")
    browser.waitForVisible("//tbody[@role='rowgroup']/tr[1]/td[6]/a")
    var fromUrl = browser.getText("//tbody[@role='rowgroup']/tr[1]/td[3]/a");
    var fromID = browser.getText("//tbody[@role='rowgroup']/tr[1]/td[4]/span");
    var toUrl = browser.getText("//tbody[@role='rowgroup']/tr[1]/td[6]/a");
    var toID = browser.getText("//tbody[@role='rowgroup']/tr[1]/td[7]/span");
    data.push(fromUrl);
    data.push(fromID);
    data.push(toUrl);
    data.push(toID);
    console.log(data);
    return data;
}

describe('PPE-105235: Create Redirects', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
        redirectActions.GoToRedirectToolPage();
        info = getValidRedirect();
    });


    it('Verify User is able to create redirects with valid URLs', function() {
        redirectActions.GoToRedirectToolPage();
        info = getValidRedirect();
        var validFromUrl = info[0];
        var validToUrl = info[2];
        deleteRedirects(validFromUrl);
        browser.pause(4000);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        //Search using from URL
        if (browser.element("//a[text()='Show Criteria']").isVisible())
            browser.click("//a[text()='Show Criteria']");
        redirectActions.SearchFromUrl(validFromUrl);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(validToUrl);
        //Search using to URL
        //defect: PPE-116468
        if (browser.element("//a[text()='Show Criteria']").isVisible())
            browser.click("//a[text()='Show Criteria']");
        redirectActions.SearchToUrl(validToUrl);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(validToUrl);
    });


    it('Verify User is able to create redirects with valid Chronicle IDs', function() {
        //defect: PPE-116469
        var validFromCID = "091e9c5e812cb65f" //info[1];
        var validToCID = "091e9c5e807327c2"; //info[3];
        deleteRedirects(validFromCID);
        browser.pause(4000);
        redirectActions.createRedirect(validFromCID, validToCID);
        //Search using from URL
        if (browser.element("//a[text()='Show Criteria']").isVisible())
            browser.click("//a[text()='Show Criteria']");
        redirectActions.SearchFromUrl(validFromCID);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromID);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(validToID);
        //Search using to URL
        if (browser.element("//a[text()='Show Criteria']").isVisible())
            browser.click("//a[text()='Show Criteria']");
        redirectActions.SearchToUrl(validToCID);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[4]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[7]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[4]/a")).to.equal(validFromCID);
        expect(browser.getText("//tbody[@role='rowgroup']//td[7]/a")).to.equal(validToCID);
    });

    it('Verify user is not able to create redirect with mix of both url and chornicle ID', function() {
        browser.refresh();
        var validFromID = info[1];
        var validToUrl = info[0];
        redirectActions.createRedirectNoClick(validFromID, validToUrl);
        expect(browser.element("//form[@name = 'redirectForm']/div/div[2]/label/span[@class='pb-field-invalid']").isVisible()).to.be.true;
        expect(browser.element("//form[@name='redirectForm']/button").isEnabled()).to.be.false;
    });

    it('Verify user is not able create redirect with empty urls', function() {
        browser.refresh();
        redirectActions.createRedirectNoClick("", "");
        expect(browser.element("//form[@name = 'redirectForm']/div/div[1]/label/span[@class='pb-field-required']").isVisible()).to.be.true;
        expect(browser.element("//form[@name = 'redirectForm']/div/div[2]/label/span[@class='pb-field-required']").isVisible()).to.be.true;
        expect(browser.element("//form[@name='redirectForm']/button").isEnabled()).to.be.false;
    });

    it('Verify Create button is disabled while creating redirects', function() {
        //defect: PPE-116397
        browser.refresh();
        var validFromUrl = info[0];
        var validToUrl = info[2];
        redirectActions.createRedirectNoClick(validFromUrl, validToUrl);
        browser.element("//form[@name='redirectForm']/button").click();
        expect(browser.element("//form[@name='redirectForm']/button").isEnabled()).to.be.false;
    });

    it('Verify user is not able create redirect with invalid urls', function() {
        browser.refresh();
        var validFromUrl = "http://www.cnn.com/testpage";
        var validToUrl = "http://www." + global.testEnv + ".webmd.com/food-recipes/healthy-recipe-finder/testFrom";
        redirectActions.createRedirectNoClick(validFromUrl, validToUrl);
        expect(browser.element("//form[@name = 'redirectForm']/div/div[1]/label/span[@class='pb-field-invalid']").isVisible()).to.be.true;
        expect(browser.element("//form[@name='redirectForm']/button").isEnabled()).to.be.false;
    });

    it('Verify user is not able to create duplicate redirects', function() {
        browser.refresh();
        var validFromUrl = info[0];
        var validToUrl = info[2];
        deleteRedirects(validFromUrl);
        browser.pause(4000);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        browser.pause(3000);
        redirectActions.createRedirectNoClick(validFromUrl, validToUrl);
        browser.element("//form[@name='redirectForm']/button").click();
        //div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div
        browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]").waitForVisible();
        expect(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]").isVisible()).to.be.true;
        expect(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div").getText()).to.equal('Redirect creation failure');
    });

    it('Verify user is not able create redirect with empty urls', function() {
        browser.refresh();
        browser.element("//button[contains(text(),'Create Redirect')]").click();
        expect(browser.element("//form[@name = 'redirectForm']/div/div[1]/label/span[@class='pb-field-required']").isVisible()).to.be.true;
        expect(browser.element("//form[@name = 'redirectForm']/div/div[2]/label/span[@class='pb-field-required']").isVisible()).to.be.true;
        expect(browser.element("//form[@name='redirectForm']/button").isEnabled()).to.be.false;
    });

    it('Verify multi hops fail', function() {
        //defect: PPE-116447
        browser.refresh();
        var validFromUrl = info[0];
        var validToUrl = info[2];
        var appendedString = randomstring.generate(5)
        var toUrl = validToUrl + "/" + appendedString.toLowerCase();
        deleteRedirects(validFromUrl);
        browser.pause(4000);
        deleteRedirects(validToUrl);
        browser.pause(4000);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        browser.pause(3000);
        redirectActions.createRedirect(validToUrl, toUrl);
        browser.pause(3000);
        redirectActions.SearchFromUrl(validToUrl);
        browser.pause(3000);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validToUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(toUrl);
        redirectActions.SearchFromUrl(validFromUrl);
        browser.pause(3000);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(toUrl);
    });
});