var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions")
var data =getValidRedirect();


function deleteRedirects(from){
    redirectActions.SearchFromUrl(from);
    browser.element("//tbody[@role='rowgroup']//td[1]").click();
    if(browser.isVisible("/html/body/main/section[1]/button")){
        // click delete button
        browser.element("/html/body/main/section[1]/button").leftClick();
        //confirm delete
        browser.element('//*[@id="modal-ok"]').leftClick(); 
        browser.waitForVisible("section.pb-notification-container.success");
    }
}

function getValidRedirect() {
    var info= [];
    var fromUrlPattern  = "http://www."+global.testEnv+".webmd.com/food-recipes/healthy*";
    redirectActions.SearchFromUrl(fromUrlPattern);
    browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
    browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
    var fromUrl = browser.getText("//tbody[@role='rowgroup']//td[3]/a");
    var fromID = browser.getText("//tbody[@role='rowgroup']//td[4]/a");
    var toUrl = browser.getText("//tbody[@role='rowgroup']//td[6]/a");
    var toID = browser.getText("//tbody[@role='rowgroup']//td[7]/a");
    info.push(fromUrl);info.push(fromID);info.push(toUrl);info.push(toID);
    return info;
}


describe('PPE-105235: Create Redirects', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
        
    });
    

    it('Verify User is able to create redirects with valid URLs', function() {
        redirectActions.GoToRedirectToolPage();
        var validFromUrl = info[0];
        var validToUrl = info[1];
        deleteRedirects(validfromUrl);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        //Search using from URL
        redirectActions.SearchFromUrl(validFromUrl);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(validToUrl);
        //Search using to URL
        redirectActions.SearchToUrl(validToUrl);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(validToUrl);
    });

    it('Verify User is able to create redirects with valid Chronicle IDs', function() {
        var validFromCID = info[1];
        var validToCID = info[3];
        deleteRedirects(validFromCID);
        redirectActions.createRedirect(validFromCID, validToCID);
        //Search using from URL
        redirectActions.SearchFromUrl(validFromCID);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromID);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal(validToID);
        //Search using to URL
        redirectActions.SearchToUrl(validToCID);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[4]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[7]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[4]/a")).to.equal(validFromCID);
        expect(browser.getText("//tbody[@role='rowgroup']//td[7]/a")).to.equal(validToCID);
    });

    it('Verify user is not able to create redirect with mix of both url and chornicle ID', function() {
        var validFromID = info[1];
        var validToUrl = info[0];
        redirectActions.createRedirectNoClick(validFromID, validToUrl);
        expect(browser.isVisbile(browser.element("//form[@name = 'redirectForm']/div/div[2]/label/span[@class='pb-field-invalid']"))).to.be.true;
        expect(browser.isEnabled(browser.element("//form[@name='redirectForm']/button"))).to.be.false;
    });

    it('Verify user is not able create redirect with invalid urls', function(){
        var validFromUrl = "http://www.cnn.com/testpage";
        var validToUrl = "http://www."+global.testEnv+".webmd.com/food-recipes/healthy-recipe-finder/testFrom";
        redirectActions.createRedirectNoClick(validFromUrl, validToUrl);
        expect(browser.isVisbile(browser.element("//form[@name = 'redirectForm']/div/div[1]/label/span[@class='pb-field-invalid']"))).to.be.true;
        expect(browser.isEnabled(browser.element("//form[@name='redirectForm']/button"))).to.be.false;
    });

    it('Verify user is not able to create duplicate redirects', function() {
        var validFromUrl = info[0];
        var validToUrl = info[2];
        deleteRedirects(validFromUrl);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        //div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div
        expect(browser.isVisible(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]"))).to.be.true;
        expect(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div").getText()).to.equal('Redirect creation failure');
    });

    it('Verify multi hops fail', function() {
        var validFromUrl = info[0];
        var validToUrl = info[2];
        deleteRedirects(validFromUrl);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        redirectActions.createRedirect(validToUrl, "http://webmd.com");
        redirectActions.SearchFromUrl(validToUrl);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validToUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal("http://webmd.com");
        redirectActions.SearchFromUrl(validFromUrl);
        browser.waitForVisible("//tbody[@role='rowgroup']//td[3]/a")
        browser.waitForVisible("//tbody[@role='rowgroup']//td[6]/a")
        expect(browser.getText("//tbody[@role='rowgroup']//td[3]/a")).to.equal(validFromUrl);
        expect(browser.getText("//tbody[@role='rowgroup']//td[6]/a")).to.equal("http://webmd.com");


        //div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div
        expect(browser.isVisible(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]"))).to.be.true;
        expect(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div").getText()).to.equal('Redirect creation failure');
    });

    it('Verify Loops redirect creation fails', function() {
        var validFromUrl = info[0];
        var validToUrl = info[2];
        deleteRedirects(validFromUrl);
        redirectActions.createRedirect(validFromUrl, validToUrl);
        redirectActions.createRedirect(validToUrl, validFromUrl);
        //div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div
        expect(browser.isVisible(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]"))).to.be.true;
        expect(browser.element("//div[@class='modal-dialog']//div[contains(@class, 'pb-overlay-content')]/div").getText()).to.equal('Redirect creation failure');
    });

});



