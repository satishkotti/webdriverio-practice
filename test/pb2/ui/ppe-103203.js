var test = require('./../common/functions/functions');

describe('PPE-77199:Verify Page Cancel Check Out functionality from Interior Work Center Screen', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
    before(() => {
        
         test.LaunchAppAndLogin();
         test.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
         var chronID = test.GetChronIDOfTheSelectedAsset();
         preData = test.GetAssetVersionAndStage('selected');
         test.CheckoutAndEditTheAsset();
         test.NavigateToHomepage();
         test.SearchFor('Page', 'Irritable Bowel Syndrome Center New Feature Page', 'Global Search', null);
         browser.waitForVisible('//td[contains(.,"Irritable Bowel Syndrome Center New Feature Page")]');
         browser.click('//td[contains(.,"Irritable Bowel Syndrome Center New Feature Page")]');
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
    it('Page Name should be Irritable Bowel Syndrome Center New Feature Page', () => {
        expect(assetDetails.Name).to.equal('Irritable Bowel Syndrome Center New Feature Page');
    });

    it('Action should be Cancel Checkout Page', () => {
        expect(assetDetails.Action).to.equal('Cancel Checkout Page');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should remain the same after Cancel Checkout', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        browser.waitForVisible('//td[contains(.,"Irritable Bowel Syndrome Center New Feature Page")]');
        browser.click('//td[contains(.,"Irritable Bowel Syndrome Center New Feature Page")]');
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should remain the same after Cancel Checkout', () => {
        expect(postData.stage).to.equal(preData.stage);
    })
   
});
