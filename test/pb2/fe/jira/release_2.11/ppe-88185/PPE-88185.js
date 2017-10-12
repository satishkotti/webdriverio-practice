var assert = require('assert');
var moduleData = require('./../../../../data/sm.assets');
var moduleTestData = require('./../../../../data/pagemodule.assets');
var templateTestData = require('./../../../../data/template.assets');

var test = require('./../../../../common/functions/functions');
var randomstring = require("randomstring");

var chronID = [];

var deprcated_modules = [
                        'ArticleTeaser',
                        'InternalRSS',
                        'SearchResultsModule',
                        'Guide Integration Module',
                        'PopupModule',
                        'OASModule',
                        'ExchangeAnnouncement',
                        'ExchangeContentFeed',
                        'ExchangeDrugReview',
                        'ExchangeInfo',
                        'ExchangeMemberSpotlight',
                        'ExchangePopularResources',
                        'ExchangePopularTips',
                        'ExchangeRSSFeed',
                        'ExchangeTopDiscussions']

function createSharedModule(type) {
    var smDetails = moduleData.deprecatedModule.get();
    smDetails.moduleType = type;
    var smid = test.Create('Shared Module', smDetails);
    var xml = test.GetModuleConfigurationSCS();

    var testdata = "<testTag>testtagdata</testTag>";
    xml = xml + testdata;
    smDetails.SCSContent = xml;
    test.ConfigureModule(type, smDetails);
    test.SaveOrPublishTheAsset('Publish To Live', 'TestPublish');
    return smid;
}

function createPageTemplateModule(contentPane, type) {
    var moduleDetails = moduleTestData.deprecatedModule.get('DeprecatedModuleContentPane'+ contentPane);
    moduleDetails.moduleType = type;
    var testdata = "<testTag>testtagdata</testTag>";
    moduleDetails.SCSContent = testdata;
    test.AddModule('ContentPane'+contentPane,moduleDetails);
    browser.pause(10000);
    test.ConfigurePageTemplateModule(type, moduleDetails);

}

function createTemplateAndPublish() {
    test.EnterIWC('Create', 'Templates & Pages');
    test.TraverseSS('Level 0/zzTest/QA and Dev')
    var templateData = templateTestData.normalStandaloneTemplate;
    templateChronID = test.Create("Template",templateData);
    createPageTemplateModule(1, deprcated_modules[1]);
    browser.pause(10000);
    createPageTemplateModule(2, deprcated_modules[7]);

    test.SaveOrPublishTheAsset('publish to live', 'Test');
    browser.pause(60000);
    console.log(templateChronID);
    return templateChronID;
}

function validateATSXML(chronID, type) {
    var xml = test.GetXML(chronID,'live');
    if(type === 'sm'){
        var content = xml.webmd_rendition.content;
        expect(content.testTag).to.equal('testtagdata');
    }
    else{
        var panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
        for(i=0;i<panes.length;i++)
        {
            var currentPane = panes[i].$.name;
            var moduleChronID = panes[i].module.$.chronic_id;
            checkATSStatus(moduleChronID);
            modulexml = test.GetXML(moduleChronID,'live');
            var content = modulexml.webmd_rendition.content;
            expect(content.testTag).to.equal('testtagdata');
        }
    }
}

function checkATSStatus(chronID){
    test.NavigatetoATSStatusCheckerPageOf(chronID, 'live');
    browser.pause(2000);
    test.WaitForATSFile();
}

describe('PPE-88185: Verify the users are displayed with editable xml for configuring modules of deprecated type instead of getting redirected to PB1.', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it("Verify user is able to configure the Shared module of Deprecated Module type from PB2", function() {
        for(i=0; i<deprcated_modules.length; i++){
            var id = createSharedModule(deprcated_modules[i])
            console.log("Chronicle ID is", id);
            chronID[i] = id;
            browser.pause(5000);
            browser.url(global.appUrl);
        }
        for(i=0; i<chronID.length; i++){
            checkATSStatus(chronID[i]);
            validateATSXML(chronID[i], 'sm');
        }
    });

    it.only("Verify user is able to configure the Page/Template module of Deprecated Module type from PB2", function() {
        browser.url(global.appUrl);
        var chronID = createTemplateAndPublish();
        checkATSStatus(chronID);
        validateATSXML(chronID, 'pm');
    });

});