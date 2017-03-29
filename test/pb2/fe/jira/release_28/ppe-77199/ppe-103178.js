var test = require('./../../../../common/functions/functions');

describe('PPE-77199:Verify Template Cancel Check Out functionality from Edit screen (already checked-out asset)', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
  var testAsset = 'Irritable Bowel Center Harmony Flexible Template';
    before(() => {
        
         test.LaunchAppAndLogin();
         test.SearchFor(null, testAsset, 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
         var chronID = test.GetChronIDOfTheSelectedAsset();
         preData = test.GetAssetVersionAndStage('selected', 'IWC');
         test.CheckoutAndEditTheAsset();
         test.NavigateToHomepage();
         test.SearchFor(null, chronID, 'Global Search', null);
         test.CancelCheckout();
    });

    it('Version of the asset should remain the same after Cancel Checkout', () => {
        browser.pause(5000);
        postData = test.GetAssetVersionAndStage(null,'Asset Screen');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should remain the same after Cancel Checkout', () => {
        expect(postData.stage).to.equal(preData.stage);
    });
   
});
