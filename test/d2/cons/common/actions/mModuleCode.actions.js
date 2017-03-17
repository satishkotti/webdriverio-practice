var codeUI = require('./../ui/mModuleCode');

var mModuleCodeObj = {
    addCodeAndTypeInsert: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.insertQuote();
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
        expect(codeTypeVal).to.equal(codeType);
    }
}

module.exports = mModuleCodeObj;