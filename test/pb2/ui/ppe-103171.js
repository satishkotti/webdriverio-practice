var test = require('./../common/functions/functions');
var templateTestData = require('./../data/template.assets');

describe('PPE-77199:Verify Template Expire functionality from Interior Work Center Screen', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
  var testAssetDetails = templateTestData.normalStandaloneTemplate;
  var testAsset = testAssetDetails.templateName;
    before(() => {
        
         test.LaunchAppAndLogin();
         test.EnterIWC('Create', 'Templates & Pages');
         test.TraverseSS('Level 0/zTest/zSubTest1');
         test.Create('Template', testAssetDetails);
         test.SaveOrPublishTheAsset('Publish to Live', 'Testing Activity Status Queue');
         test.EnterIWC('Edit', 'Templates & Pages');
         browser.waitForVisible('//td[contains(.,"' + testAsset + '")]');
         browser.click('//td[contains(.,"' + testAsset + '")]');
         var chronID = test.GetChronIDOfTheSelectedAsset();
         preData = test.GetAssetVersionAndStage('selected');
         test.EnterActivityQueueStatusPage();
         browser.waitUntil( () => 
         {
              assetDetails = test.GetAssetDetailsFromQueue(chronID);
              return assetDetails.Status != 'IN PROGRESS';
         }, 120000, "Asset not pushed to the publishing queue yet", 20000);
        test.SearchFor(null, testAsset, 'Interior Workcenter', 'Level 0/zTest/zSubTest1');
        test.SelectMoreActionsMenuItem('Expire');

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       
        
        browser.waitUntil(() => {
                assetDetails = test.GetAssetDetailsFromQueue(chronID);
                return assetDetails.Status != 'IN PROGRESS';
            }, 120000, "Asset not pushed to the publishing queue yet", 20000);

        });
   
    //assertions
    it('Template Name should be QATemplate-ActivtyQueue-xxxxx', () => {
        expect(assetDetails.Name).to.equal(testAsset);
    });

    it('Action should be Expire Template', () => {
        expect(assetDetails.Action).to.equal('Expire Template');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the page should remain the same after expiring the template', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        test.ClickShowExpired();
        browser.waitForVisible('//td[contains(.,"' + testAsset + '")]');
        browser.click('//td[contains(.,"' + testAsset + '")]');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the template should be expired after expiring the template', () => {
        expect(postData.stage).to.equal('expired');
    });
   
});
