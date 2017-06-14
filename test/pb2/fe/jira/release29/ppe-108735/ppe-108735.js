
const test = require('./../../../../common/functions/functions.js');
const testdata = require('./../../../../data/testdata/PPE-108735.testdata');
const randomstring = require('randomstring');

describe('PPE-108735: Support for Query Strings in Pointers', () => {

    var VerifyExternalLink = function (linkText) {
        let locator = '//a[text()="***"]';
        locator = locator.replace('***', linkText);
        browser.waitForExist(locator);
        return browser.isVisible(locator);
    };

    var ClickExternalLink = function (linkText) {
        let locator = '//a[text()="***"]';
        locator = locator.replace('***', linkText);
        browser.waitForExist(locator);
        browser.click(locator);
    };

    const liveUsernameField = 'input[name="loginfmt"]';

    var moduleConfig = function (linksArr) {
        let temp = linklistModule;
        temp.moduleLinks = linksArr;
        return temp;
    }

    var assetChronId, pbApp, tabs;

    var page = testdata.Page('QAP-PPE-108735-'), linklistModule = testdata.LinkListModule('PM0001');

    var baseurl = 'https://login.live.com/';
    var uri = testdata.sampleUri + randomstring.generate(5);

    var sitestructure = 'Level 0/zzTest/QA and Dev';

    before(() => {

        //Launch app and login
        test.LaunchAppAndLogin();

        //Create an asset or navigate to an existing asset
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS();
        assetChronId = test.Create('Page', page);

        //Add a vertical promo page module
        test.AddModule('ContentPane5', linklistModule);
        browser.pause(5000);
        
        //Obatin the test data for configuring the linklist module
        let testdataSet1 = testdata.moduleLinksSet().moduleLinks;
        let moduleprops = moduleConfig(testdataSet1);

        //Scroll to Content Pane 5
        let location = browser.getLocation('//a[string()="PM0001"]', 'y');
        browser.scroll('//a[string()="PM0001"]', 0, parseFloat(location));
        browser.click('//a[string()="PM0001"]');

        //Configure the module: Add the links to module and save the configuration
        test.ConfigureModule('LinkList Module', moduleprops);
        test.SaveModuleConfig();
        browser.pause(5000);

        //Publish the page
        test.SaveOrPublishTheAsset('publish to live', 'Testing PPE-10875: Ability to add encoded and uncoded external urls with query strings');
        pbApp = browser.getUrl();

        //Wait for ATS to process the asset
        test.NavigatetoATSStatusCheckerPageOf(assetChronId, 'staging');
        test.WaitForATSFile();

        //Naviagate to the runtime
        tabs = test.NavigateToRuntimePage();
    });

    //Validations
    it('PPE-112480: Verify whether pointer to an external URL with query string parameters is created, when user enters an external URL which is encoded.', () => {
        expect(VerifyExternalLink('Unencoded external url')).to.be.true;
    });

    it('PPE-112481: When user enters an external URL which is not encoded, verify whether pointer is created by encoding the query string parameters to the external URL.', () => {
        expect(VerifyExternalLink('Encoded external url')).to.be.true;
    });

    //Skipping the below tests as per the comments of Scott Cody in the user story
    it.skip('PPE-112482: When the user clicks on the URL link with query parameters, from the runtime, verify whether user is navigated to the respective external page.', () => {
        ClickExternalLink('Unencoded external url');
        expect(browser.isVisible(liveUsernameField)).to.be.true;
    });

    it.skip('PPE-114804: When the user clicks on the encoded URL link with query parameters, from the runtime, verify whether user is navigated to the respective external page.', () => {
        browser.back();
        ClickExternalLink('Encoded external url');
        expect(browser.isVisible(liveUsernameField)).to.be.true;
    });

});