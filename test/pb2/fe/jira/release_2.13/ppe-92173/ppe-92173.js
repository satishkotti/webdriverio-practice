//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-92173.testdata');

var userSettingMenu = "//header/section/div/ul[contains(@class, 'pb-menu')]";
//Tests
describe(`PPE-92173:Verify the menu items "Prefrences" and "Refresh PB1 Caches" are removed from drodpdown under username. `, () => {

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();
        test.ToggleUserSettingsMenu();
        browser.waitForVisible(userSettingMenu);
    });
    it('Verify Menu item "Prefrences" is removed', () => {
      
      
        var link_prefrences = browser.isExisting(testdata.RemovePB1Links_ActionLinks.Preferences);
        expect(link_prefrences).to.be.false;
    
        browser.pause(5000);
     
    });
    it('Verify Menu item "Refresh PB1 Caches" is removed', () => {
    
        var link_Refresh_PB1_Caches = browser.isExisting(testdata.RemovePB1Links_ActionLinks.Refresh_PB1_Caches);
        expect(link_Refresh_PB1_Caches).to.be.false;
        browser.pause(5000);
     
    });
    it('Verify Menu item "Reset PB1 Sessions" is retained', () => {
   
        var link_Reset_PB1_Sessions = browser.isExisting(testdata.RemovePB1Links_ActionLinks.Reset_PB1_Sessions);
        expect(link_Reset_PB1_Sessions).to.be.true;
     
        browser.pause(5000);
    });

    it('Verify Menu item "Change Site" is retained', () => {
    
        var link_changeSite = browser.isExisting(testdata.RemovePB1Links_ActionLinks.Change_Site);
        expect(link_changeSite).to.be.true;
        browser.pause(5000);
    });
    it('Verify Menu item "PageBuilder Help" is retained', () => {
     
        var link_PageBuilder_Help = browser.isExisting(testdata.RemovePB1Links_ActionLinks.PageBuilder_Help);
        expect(link_PageBuilder_Help).to.be.true;
    
        browser.pause(5000);
    });
    it('Verify Menu item "Logout" is retained', () => {
    
        var link_Logout = browser.isExisting(testdata.RemovePB1Links_ActionLinks.Logout);
        expect(link_Logout).to.be.true;
    
        browser.pause(5000);
    });
    after(() => {
             
                test.ToggleUserSettingsMenu();
                test.Logout();
     });
});