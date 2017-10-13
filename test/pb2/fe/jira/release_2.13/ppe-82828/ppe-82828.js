//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-82828.testdata');
var _SMData = testdata.RemoveCopyNode_actionbuttons;
//Tests
describe(`PPE-82828:Verify Remove "Copy Node" action buttons`, () => {

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();

    });
    it('Verify Remove Copy Node', () => {
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        browser.waitForVisible(_SMData.NodeActions);
        browser.click(_SMData.NodeActions);
        var GetRemoveCopyNode = browser.isExisting(_SMData.RemoveCopyNode);
        expect(GetRemoveCopyNode).to.be.false;
        browser.pause(5000);
        console.log('done');
    });
    it('Verify Remove Node Copy , Replace Originals', () => {
        browser.refresh();
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zTest/zSubTest1/zSubTest2');
        browser.waitForVisible(_SMData.NodeActions);
        browser.pause(10000);
        browser.click(_SMData.NodeActions);
        browser.waitForVisible(_SMData.PublishNode);
        for (var i = 0; i < _SMData.RemovedNodeCopy_Originals.length; i++) {

            var GetRemoveNodeCopy_Originals = browser.isExisting(`//li[contains(.,"${_SMData.RemovedNodeCopy_Originals[i]}")]`);
            expect(GetRemoveNodeCopy_Originals).to.be.false;
        }
    });

});