var test = require('./../common/functions/functions');

describe('PPE-77199:Verify the Schedule Publish functionality for pages', () => {
  var assetDetails = {};
  var assetName='Irritable Bowel Syndrome Center New Feature Page';
    before(() => {
        
         test.LaunchAppAndLogin();
         test.SearchFor(null,assetName , 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
         var chronID = test.GetChronIDOfTheSelectedAsset();
         test.CheckoutAndEditTheAsset();
         test.SaveOrPublishTheAsset('Schedule Publish', 'Testing activity queue');  
         
        //enter into the Queue Page  
       test.EnterActivityQueueStatusPage();       
        
        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 150000, "Asset not pushed to the publishing queue yet", 30000);

    });
   
    //assertions
      it('Page Name should be Irritable Bowel Syndrome Center New Feature Page', () => {
            expect(assetDetails.Name).to.equal(assetName);
      });
     it('Page Action should be Schedule Publish Page', () => {
            expect(assetDetails.Action).to.equal('Schedule Publish Page');
        });

     
   
});
