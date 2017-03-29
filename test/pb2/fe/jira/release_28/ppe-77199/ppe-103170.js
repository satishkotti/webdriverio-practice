var test = require('./../common/functions/functions');

describe('PPE-77199:Verify Template Cancel Check Out functionality from Interior Work Center Screen', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
  var testAsset = 'Irritable Bowel Center Harmony Flexible Template';
    before(() => {
        
         test.LaunchAppAndLogin();
         test.SearchFor(null, testAsset, 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
         var chronID = test.GetChronIDOfTheSelectedAsset();
         preData = test.GetAssetVersionAndStage('selected');
         test.CheckoutAndEditTheAsset();
         test.NavigateToHomepage();
         test.EnterIWC('Edit', 'Templates & Pages');
         browser.waitForVisible('//td[contains(.,"' + testAsset + '")]');
         browser.click('//td[contains(.,"' + testAsset + '")]');
         test.SelectMoreActionsMenuItem('Cancel Checkout');

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       
        
        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 20000);

    });
   
    //assertions
    it('Template Name should be Irritable Bowel Center Harmony Flexible Template', () => {
        expect(assetDetails.Name).to.equal(testAsset);
    });

    it('Action should be Cancel Checkout Page', () => {
        expect(assetDetails.Action).to.equal('Cancel Checkout Template');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should remain the same after Cancel Checkout', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        browser.waitForVisible('//td[contains(.,"' + testAsset + '")]');
        browser.click('//td[contains(.,"' + testAsset + '")]');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should remain the same after Cancel Checkout', () => {
        expect(postData.stage).to.equal(preData.stage);
    })
   
});
