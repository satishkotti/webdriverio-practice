var codeUI = require('./../ui/mModuleCode');
var propertiesTabUI = require('./../ui/propertiesTab');

var mModuleCodeObj = {
    addCodeAndTypeInsert: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.insertCode();
    },
    addCodeAndTypeCancel: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.cancelCode();
    },
    updateCodeAndTypeCancel: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.updateCode();
    },
    verifyLabels: function () {
        var codeLabel = codeUI.getCodeLabel();
        var codeTypeLabel = codeUI.getCodeTypeLabel();
        expect(codeLabel).to.equal('Code');
        expect(codeTypeLabel).to.equal('Code Type');
    },
    verifyCodeAndType: function (codeText, codeType) {
        var codeVal = codeUI.getCodeValue();
        var codeTypeVal =codeUI.getCodeTypeValue();

        expect(codeVal).to.equal(codeText);
        expect(codeText.length).to.equal(codeVal.length);
        expect(codeTypeVal.toLowerCase()).to.equal(codeType.toLowerCase());
        
    },

    VerifyAvlblyCodeType: function (codeText, codeType) {
        
        codeUI.codeAndTypeSetValue(codeText, codeType);
        var codeTypeVal =codeUI.getCodeTypeValue();
        if(codeType=="")
        {
         expect(codeTypeVal.toLowerCase()).to.equal("? string: ?");
        }
        else
        {
            expect(codeTypeVal.toLowerCase()).to.equal(codeType.toLowerCase());
        }
    

    },


    

    VerifyAvlblycode_social: function (code_social) {
        
        propertiesTabUI.propertiesTabSelect();
        browser.click("//span[text()='Properties']");
        var getcode_scl =codeUI.getcode_socialvalue();
        expect(getcode_scl.toLowerCase()).to.equal(code_social.toLowerCase());
        
    },

    RepositoryRefresh: function()
    {

        codeUI.RepositoryRefresh();
    }
    
}

module.exports = mModuleCodeObj;