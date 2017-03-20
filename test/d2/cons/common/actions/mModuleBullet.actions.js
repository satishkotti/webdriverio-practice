var mModuleBulletListUI = require('./../ui/mModuleBulletList');

var mModuleBulletListObj = {
    addCodeAndTypeInsert: function (codeText, codeType) {
       
    },
    addCodeAndTypeCancel: function (codeText, codeType) {
       
    },
    updateCodeAndTypeCancel: function (codeText, codeType) {
       
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