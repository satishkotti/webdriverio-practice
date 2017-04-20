var test = require('./../../../../common/functions/functions');

describe('PPE-77199:Verify Shared Module Cancel Check Out functionality from Checked Out Objects widget', () => {
  var assetDetails = {};
  var preData = {};
  var postData = {};
  
  var testAsset = 'healthy-blood-sugar-levels-quiz-results';
    before(() => {
        
         test.LaunchAppAndLogin();
         test.SearchFor('SM', testAsset, 'Global Search', null);
         test.SelectAsset(testAsset);
         var chronID = test.GetChronIDOfTheSelectedAsset('Search Results');
         preData = test.GetAssetVersionAndStage('selected');
         test.EditTheAsset();
         test.NavigateToHomepage();
         test.SearchFor(null, chronID, 'Global Search', null);
         test.CancelCheckout();

    });
   
    //assertions
    it('Version of the asset should remain the same after Cancel Checkout', () => {
        test.SearchFor('SM', testAsset, 'Global Search', null);
        test.SelectAsset(testAsset);
        postData = test.GetAssetVersionAndStage('selected');
        expect(postData.version).to.equal(preData.version);
    });

    it('Stage of the asset should remain the same after Cancel Checkout', () => {
        expect(postData.stage).to.equal(preData.stage);
    })
   
});
