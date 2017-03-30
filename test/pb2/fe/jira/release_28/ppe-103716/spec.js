var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for Multiple Video Launch Module', () => {

    var testAssetProps = smTestData.multipleVideoLaunchModule;
    var testAssetName = testAssetProps.moduleName;

    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    //Create Scenario
    describe('Creation Scenario', () => {

        before(() => {
            test.Create('SM', sm)
         });
        
    });
    
});