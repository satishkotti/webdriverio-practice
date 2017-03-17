var test = require('./../common/functions/functions');

describe('Page Flows', () => {

    it('Publish to Live', () => {
        test.LaunchAppAndLogin();
        test.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        var preData = test.GetAssetVersionAndStage('selected');
        test.CheckoutAndEditTheAsset();
        test.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        test.EnterActivityQueueStatusPage();
    });
    
});