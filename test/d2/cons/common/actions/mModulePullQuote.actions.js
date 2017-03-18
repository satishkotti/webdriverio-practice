var pullQuoteUI = require('./../ui/mModulePullQuote');

var mModulePullQuoteObj = {
    addQuoteTextAttributeAlignInsert: function (quoteText, quoteAttr, quoteAlign) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyLabels();
        mModulePullQuoteObj.verifyCodeAndType(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.insertQuote();
    },
    addQuoteTextAttributeAlignCancel: function (quoteText, quoteAttr, quoteAlign) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyLabels();
        mModulePullQuoteObj.verifyCodeAndType(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.cancelQuote();
    },
    updateCodeAndTypeCancel: function (codeText, codeType) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyCodeAndType(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.updateQuote(codeText, codeType);
    },
    verifyLabels: function () {
        var quoteLabel = pullQuoteUI.getQuoteLabel();
        var quoteAttrLabel = pullQuoteUI.getQuoteAttrLabel();

        expect(quoteLabel).to.equal('Quote Text');
        expect(quoteAttrLabel).to.equal('Quote Attribution');
    },
    verifyCodeAndType: function (quoteText, quoteAttr, quoteAlign) {
        
        /*
        var codeVal = pullQuoteUI.getCodeValue();
        var codeTypeVal = pullQuoteUI.getCodeTypeValue();
        expect(codeVal).to.equal(codeText);
        expect(codeTypeVal).to.equal(codeType);
        */
    }
}

module.exports = mModulePullQuoteObj;