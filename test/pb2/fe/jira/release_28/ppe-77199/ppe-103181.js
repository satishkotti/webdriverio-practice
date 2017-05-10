var test = require('./../../../../common/functions/functions');
var templateTestData = require('./../../../../data/template.assets');
var pageTestData = require('./../../../../data/page.assets');
var pmTestData = require('./../../../../data/pagemodule.assets');

describe('PPE-77199:Verify the Propagation & Delete Propagation functionality for New Template', () => {
    var assetDetails = {};
    var parentTemplateName = '';
    var childTemplateName = '';
    var childPageName = '';
    var childPageChronId = '';
    var childTempChronId = '';

    before(() => {
        assetDetails = templateTestData.normalStandaloneTemplate;
        parentTemplateName = assetDetails.templateName;
        var parentTemplateLayout = assetDetails.layout;
        var parentTemplateLayoutCSS = assetDetails.layoutCSS;
        var templateToInheritFrom = parentTemplateName + ' [' + parentTemplateLayout + 'Layout' + ' - ' + parentTemplateLayoutCSS + ']';

        test.LaunchAppAndLogin();
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zTest/zSubTest1');
        var parentChronId = test.Create('Template', assetDetails);
        test.AddModule('ContentPane0', pmTestData.htmlModule.get('PM0001'));
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Queue - Propagate Scenario');

        assetDetails = templateTestData.normalInheritedTemplate.get(templateToInheritFrom);
        childTemplateName = assetDetails.templateName;
        test.EnterIWC('Create', 'Templates & Pages');
        childTempChronId = test.Create('Template', assetDetails);
        test.AddModule('ContentPane1', pmTestData.htmlModule.get('PM0002'));
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Queue - Propagate Scenario');

        assetDetails = pageTestData.normalInheritedPage.get(templateToInheritFrom);
        childPageName = assetDetails.pageName;
        test.EnterIWC('Create', 'Templates & Pages');
        childPageChronId = test.Create('Page', assetDetails);
        test.AddModule('ContentPane2', pmTestData.htmlModule.get('PM0003'));
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Queue - Propagate Scenario');

        test.SearchFor(null, parentChronId, 'Global Search', null);
        test.EditTheAsset();
        test.SwitchAssetTabs('Template Layout');
        test.AddModule('ContentPane1', pmTestData.htmlModule.get('PM0004'));
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Queue - Propagate Scenario');
        test.EnterActivityQueueStatusPage();
        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(parentChronId);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

        test.SearchFor(null, parentChronId, 'Global Search', null);
        test.SwitchAssetTabs('Template Layout');

        //Propagate
        test.Propagate({
            "modules":
            [{
                "moduleName": "PM0004",
                "modulePosition": "Top of Content Pane"
            }],
            "childTemplates": [childTemplateName],
            "childPageStage": "Live"
        });

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();

        browser.waitUntil(() => {
            assetDetails = test.GetAssetDetailsFromQueue(parentChronId);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

    });

    //assertions
    it('Template Name in the Queue should be same as populated in the Template Properties page', () => {
        expect(assetDetails.Name).to.equal(parentTemplateName);
    });

    it('Template Action should be Publish Template', () => {
        expect(assetDetails.Action).to.equal('Propagate Template Module');
    });

    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });
    it('Display of Propagate module on Template', () => {
        test.SearchFor(null, childTempChronId, 'Global Search', null);
        test.SwitchAssetTabs('Template Layout');
        browser.waitForVisible('//span[@title="PM0004"]');
        expect(browser.isExisting('//span[@title="PM0004"]')).to.be.true;
    });
    it('Display of Propagate module on Page', () => {
        test.SearchFor(null, childPageChronId, 'Global Search', null);
        test.SwitchAssetTabs('Page Layout');
        browser.waitForVisible('//span[@title="PM0004"]');
        expect(browser.isExisting('//span[@title="PM0004"]')).to.be.true;
    });
});
