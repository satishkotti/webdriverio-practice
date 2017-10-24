//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-82827.testdata');

var userSettingMenu = "//header/section/div/ul[contains(@class, 'pb-menu')]";
//Tests
describe(`PPE-82827:Verify the menu items "Prefrences" and "Refresh PB1 Caches" are removed from drodpdown under username. `, () => {

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();
        test.ToggleHamburgerMenu();

    });
    it('Verify Menu item "Site Admin" is removed', () => {
        var link_siteAdmin = browser.isExisting(testdata.RemoveSiteAdmin_ActionLinks.Site_Admin);
        expect(link_siteAdmin).to.be.false;
        browser.pause(5000);
    });
    it('Verify Menu item "UMT" is retained', () => {
        var link_umt = browser.isExisting(testdata.RemoveSiteAdmin_ActionLinks.UMT);
        expect(link_umt).to.be.true;
        browser.pause(5000);
    });
    it('Verify Menu item "Redirect Tool" is retained', () => {
        var link_redirectTool = browser.isExisting(testdata.RemoveSiteAdmin_ActionLinks.Redirect_Tool);
        expect(link_redirectTool).to.be.true;
        browser.pause(5000);
    });
    
    after(() => {
        
           test.ToggleHamburgerMenu();
           test.Logout();
    });
});