var test = require('./../../../../common/functions/functions');

describe('PPE-77199:Verify Template Publish to Live functionality from Edit Screen', () => {
  var assetDetails = {};
    before(() => {
        
        test.LaunchAppAndLogin();
        test.SearchFor(null,'Irritable Bowel Center Harmony Flexible Template','Interior Workcenter','Level 0/Centers - Health/Irritable Bowel Syndrome');            
        var chronID = test.GetChronIDOfTheSelectedAsset();
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Save', 'Testing activity queue');       

        test.SearchFor('Template','Irritable Bowel Center Harmony Flexible Template','Global Search',null);  
        test.SelectAsset('Irritable Bowel Center Harmony Flexible Template');
        test.SaveOrPublishTheAssetFromMoreActions('Publish to Live','Activty Queue publish to live');     
        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       

        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

    });
   
    //assertions
    it('Template Name should be Irritable Bowel Center Harmony Flexible Template', () => {
        expect(assetDetails.Name).to.equal('Irritable Bowel Center Harmony Flexible Template');
    });

    it('Template Action should be Publish Template', () => {
        expect(assetDetails.Action).to.equal('Publish Template');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site).to.equal(test.GetCurrentSite());
    });
   
});
