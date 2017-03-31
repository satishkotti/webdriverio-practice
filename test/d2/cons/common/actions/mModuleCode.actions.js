var codeUI = require('./../ui/mModuleCode');

var mModuleCodeObj = {
    addCodeAndTypeInsert: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.insertCode(codeText, codeType);
    },
    addCodeAndTypeCancel: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.cancelCode(codeText, codeType);
    },
    updateCodeAndTypeCancel: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.updateCode(codeText, codeType);
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
        expect(codeTypeVal.toLowerCase()).to.equal(codeType.toLowerCase());
    }
    
}

module.exports = mModuleCodeObj;