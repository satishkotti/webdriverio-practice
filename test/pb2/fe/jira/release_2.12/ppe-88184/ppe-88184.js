//Constants
const test = require('./../../../../common/functions/functions.js');
const props = require('./../../../../common/elements/assetprops.page');

//Testdata
const testdata = require('./../../../../data/testdata/ppe-88184.testdata');
var _SMData = testdata.Module_Type;
//Tests
describe(`PPE-88184:Verify Remove Module Types`, () => {

    before(() => {

        //Launch PB2 app and login
        test.LaunchAppAndLogin();

    });
    it('Verify Remove Module Types  in Advance Search', () => {

        browser.click(_SMData.SelectAdvanceSearchButton);
        browser.waitForVisible(_SMData.ObjectType);
        browser.click(_SMData.ObjectType);
        browser.click(_SMData.SelectSharedModule);
        browser.waitForVisible(_SMData.SelectAdvanceSearchModuleType);
        browser.click(_SMData.SelectAdvanceSearchModuleType);

        for (var i = 0; i < _SMData.RemovedModuleType.length; i++) {

            var AdvanceSearchModuleTypes = browser.isExisting(`//option[@label="${_SMData.RemovedModuleType[i]}"]`);
            expect(AdvanceSearchModuleTypes).to.be.false;

        }
        browser.pause(5000);

    });
    it('Verify Remove Module Types  in Dynamic Programmed Module', () => {

        //Select a Dynamic Programmed Module
        test.Select('Dynamic Programmed Module');
        browser.waitForVisible(_SMData.SelectAdvanceSearchModuleType);
        browser.click(_SMData.SelectAdvanceSearchModuleType);

        for (var i = 0; i < _SMData.RemovedModuleType.length; i++) {

            var DynamicProgrammedModuleModuleTypes = browser.isExisting(`//option[@label="${_SMData.RemovedModuleType[i]}"]`);
            expect(DynamicProgrammedModuleModuleTypes).to.be.false;

        }
        browser.pause(5000);
    });
    it('Verify Remove Module Types  in Create Shared Module', () => {

        //Select a Shared Module
        test.Select('Shared Module');
        browser.waitForVisible(_SMData.SelectAdvanceSearchModuleType);
        browser.click(_SMData.SelectAdvanceSearchModuleType);

        for (var i = 0; i < _SMData.RemovedModuleType.length; i++) {

            var SharedModuleTypes = browser.isExisting(`//option[@label="${_SMData.RemovedModuleType[i]}"]`);
            expect(SharedModuleTypes).to.be.false;

        }
        browser.pause(5000);
    });
    it('Verify Remove Module Types  in Create Module XSL', () => {

        //Select a Module XSL
        test.Select('Module XSL');
        let iframe = browser.element(_SMData.Xsliframe);
        browser.frame(iframe.value);
        browser.waitForVisible(_SMData.SelectXSLModule);
        browser.click(_SMData.SelectXSLModule);

        for (var i = 0; i < _SMData.RemovedModuleType.length; i++) {

            var XSLModuleTypes = browser.isExisting(`//option[@label="${_SMData.RemovedModuleType[i]}"]`);
            expect(XSLModuleTypes).to.be.false;

        }
        browser.pause(5000);
    });

});