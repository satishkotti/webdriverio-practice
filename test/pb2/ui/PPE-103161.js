var test = require('./../common/functions/functions');

describe('Template Flows -Edit Screen- Publish to Live', () => {
  var assetDetails = {};
    before(() => {
        
        test.LaunchAppAndLogin();
        test.SearchFor(null,'Irritable Bowel Center Harmony Flexible Template','Interior Workcenter','Level 0/Centers - Health/Irritable Bowel Syndrome');        
        var chronID = test.GetChronIDOfTheSelectedAsset();
       // var preData = test.GetAssetVersionAndStage('selected');             
        test.SearchFor('Template','Irritable Bowel Center Harmony Flexible Template','Global Search',null);        
        test.SaveOrPublishTheAssetFromMoreActions('Publish to Live','Activty Queue publish to live');     
        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       

        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status[0] != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

    });
   
    //assertions
    it('Template Name should be Irritable Bowel Center Harmony Flexible Template', () => {
        expect(assetDetails.Name[0]).to.equal('Irritable Bowel Center Harmony Flexible Template');
    });

    it('Template Action should be Publish Template', () => {
        expect(assetDetails.Action[0]).to.equal('Publish Template');
    });
    
    it('Site should be the current Site under test', () => {
        expect(assetDetails.Site[0]).to.equal(test.GetCurrentSite());
    });
   
});
