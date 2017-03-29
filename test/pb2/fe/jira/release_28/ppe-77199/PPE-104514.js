var test = require('./../../../../common/functions/functions');

describe('PPE-77199:Verify the Publish Node functionality', () => {
  var assetDetails = {}; 
  var selectedNodeName='Channel Features';
  var chronID='';
    before(() => {
        
         test.LaunchAppAndLogin();
         test.EnterIWC('Edit','Templates & Pages');
         test.TraverseSS('Level 0/Flat Site Structure/Channel Content/Channel Features');
        // var node=$('//span[text()="Channel Features"]');
         browser.waitForVisible('//span[text()="Channel Features"]');
         chronID= browser.getAttribute('//span[text()="Channel Features"]','data-id');       
         test.SelectNodeAction(['Publish Node', selectedNodeName,'Live','Staging']);

        //enter into the Queue Page  
        test.EnterActivityQueueStatusPage();       
        
        browser.waitUntil( () => 
        {
            assetDetails = test.GetAssetDetailsFromQueue(chronID);
            return assetDetails.Status != 'IN PROGRESS';
        }, 120000, "Asset not pushed to the publishing queue yet", 30000);

    });
   
    //assertions
   
     it('Queue Name should be same as selected node when we click on publish node', () => {
        expect(assetDetails.Name).to.equal(selectedNodeName);
    });

    it('Queue Action should be Publish Node', () => {
        expect(assetDetails.Action).to.equal('Publish Node');
    });
    
    it('Queue Chron ID should be node data-id', () => {
        expect(assetDetails.ChronID).to.equal(chronID);
    });
   
});
