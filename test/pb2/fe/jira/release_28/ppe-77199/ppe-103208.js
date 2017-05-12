var test = require('./../../../../common/functions/functions');
var pageTestData = require('./../../../../data/page.assets');

describe('PPE-77199:Verify Page Expire functionality from Read Only Screen', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
  var testAssetDetails = pageTestData.normalStandalonePage;
  var testAsset = testAssetDetails.pageName;
    before(() => {
        
         test.LaunchAppAndLogin();
         test.EnterIWC('Create', 'Templates & Pages');
         test.TraverseSS('Level 0/zTest/zSubTest1');
         test.Create('Page', testAssetDetails);
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
        test.SearchFor(null, chronID, 'Global Search', null);
        test.SelectMoreActionsMenuItem('Expire');

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       
        
        browser.waitUntil(() => {
                assetDetails = test.GetAssetDetailsFromQueue(chronID);
                return assetDetails.Status != 'IN PROGRESS';
            }, 120000, "Asset not pushed to the publishing queue yet", 20000);

        });
   
    //assertions
    it('Page Name should be QAPage-ActivtyQueue-xxxxx', () => {
        expect(assetDetails.Name).to.equal(testAsset);
    });

    it('Action should be Expire Page', () => {
        expect(assetDetails.Action).to.equal('Expire Page');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should remain the same after expiring the asset', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        test.ClickShowExpired();
        browser.waitForVisible('//td[contains(.,"' + testAsset + '")]');
        browser.click('//td[contains(.,"' + testAsset + '")]');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should be expired after expiring the asset', () => {
        expect(postData.stage).to.equal('expired');
    });
   
});
