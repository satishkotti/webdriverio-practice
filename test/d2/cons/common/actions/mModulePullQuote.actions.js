var pullQuoteUI = require('./../ui/mModulePullQuote');

var mModulePullQuoteObj = {
    addQuoteTextAttributeAlignInsert: function (quoteText, quoteAttr, quoteAlign) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyLabels();
        mModulePullQuoteObj.verifyPullQuoteValues(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.insertQuote();
    },
    addQuoteTextAttributeAlignCancel: function (quoteText, quoteAttr, quoteAlign) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyLabels();
        mModulePullQuoteObj.verifyPullQuoteValues(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.cancelQuote();
    },
    updateQuoteTextAttributeAlign: function (quoteText, quoteAttr, quoteAlign) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyLabels();
        mModulePullQuoteObj.verifyPullQuoteValues(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.insertQuote();
    },
    cancelUpdateQuoteAttributeAlign: function (quoteText, quoteAttr, quoteAlign) {
        pullQuoteUI.quoteTextAttributeAlignSetValue(quoteText, quoteAttr, quoteAlign);
        mModulePullQuoteObj.verifyPullQuoteValues(quoteText, quoteAttr, quoteAlign);
        pullQuoteUI.updateQuote();
    },
    verifyLabels: function () {
        var quoteLabel = pullQuoteUI.getQuoteLabel();
        var quoteAttrLabel = pullQuoteUI.getQuoteAttrLabel();
        var alignLabel = pullQuoteUI.getAlignLabel();
        expect(quoteLabel).to.equal('Quote Text');
        expect(quoteAttrLabel).to.equal('Quote Attribution');
        expect(alignLabel).to.equal('Align');
    },
    verifyPullQuoteValues: function (quoteText, quoteAttr, quoteAlign) {
        var quoteText = pullQuoteUI.getQuoteText();
        var quoteAttrVal = pullQuoteUI.getQuoteAttribution();
        var pullQuoteAlign = pullQuoteUI.getAlignValue();
        expect(quoteText).to.equal(quoteText);
        expect(quoteAttrVal).to.equal(quoteAttr);
        expect(pullQuoteAlign).to.equal(quoteAlign);
     }
}

module.exports = mModulePullQuoteObj;