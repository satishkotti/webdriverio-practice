var func = require('./../common/functions/functions');

describe('Page Flows', () => {

    it('Publish to Live', () => {
        func.LaunchAppAndLogin();
        func.SearchFor(null, 'Irritable Bowel Syndrome Center New Feature Page', 'Interior Workcenter', 'Level 0/Centers - Health/Irritable Bowel Syndrome');
        var preData = func.GetVersionAndStage('selected');
        func.CheckoutAndEditTheAsset();
        func.SaveOrPublishTheAsset('Publish to Live', 'Testing activity queue');
        func.EnterQueueStatusPage();
    });
    
});