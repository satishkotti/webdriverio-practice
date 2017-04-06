var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('Unit Test - Sponsor Boxes Module - UI', () => {

    var testAssetProps = smTestData.sponsorboxesModule;
    var testAssetName = testAssetProps.moduleName;

    it('Testing sponsor box module', () => {
        //Launch App
        test.LaunchAppAndLogin();
        test.Create('Shared Module', testAssetProps);
        test.ConfigureModule('sponsor box module', testAssetProps);
    });

    after(() => {
        test.SaveOrPublishTheAsset('Publish to Live', 'Test');
    });

});