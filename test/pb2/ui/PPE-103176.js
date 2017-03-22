var test = require('./../common/functions/functions');

describe('PPE-77199:Verify Template Publish to Live functionality from Read Only Screen', () => {
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
         test.SaveOrPublishTheAsset('Save', 'Testing activity queue');       

         test.NavigateToHomepage();
         test.SearchFor(null, chronID, 'Global Search', null);              
         test.SaveOrPublishTheAssetFromMoreActions('Publish to Live','Activty Queue publish to live');

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
        expect(assetDetails.Action).to.equal('Publish Template');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });

    it('Version of the asset should not be same after publish to live', () => {
        test.EnterIWC('Edit', 'Templates & Pages');
        test.SelectAsset(testAsset);     
        postData = test.GetAssetVersionAndStage('selected');
       expect(parseFloat(postData.version)).to.equal(parseFloat(preData.version)+parseFloat('1.0'));
    });
   
   
});
