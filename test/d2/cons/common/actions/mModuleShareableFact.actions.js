var mModuleShareableFactUI = require('./../ui/mModuleShareableFact');

var mModuleShareableFactObj = {
    getTitleDescriptionAlignSSS: function(){
       
        return {
            title: mModuleShareableFactUI.titleGet(),
            description: mModuleShareableFactUI.descriptionGet(),
            align: mModuleShareableFactUI.alignSet(),
            isSupressSocialShare: mModuleShareableFactUI.supressSocialShareChkBoxGet()
        };
    },
    InsertTitleDescriptionAlignAnSupressSocialShare: function (titleText, descriptionText, alignSelected, isSocialShareSupressChecked) {
       mModuleShareableFactObj.titleDescriptionAlignSSSChecked(titleText, descriptionText, alignSelected, isSocialShareSupressChecked);
        mModuleShareableFactObj.verifyLabels();
        mModuleShareableFactUI.insert();
    },
    UpdateTitleDescriptionAlignAnSupressSocialShare: function (titleText, descriptionText, alignSelected, isSocialShareSupressChecked) {
        mModuleShareableFactObj.titleDescriptionAlignSSSChecked(titleText, descriptionText, alignSelected, isSocialShareSupressChecked);
        mModuleShareableFactObj.verifyLabels();
        mModuleShareableFactUI.update();
    },
    CancelTitleDescriptionAlignAnSupressSocialShare: function (titleText, descriptionText, alignSelected, isSocialShareSupressChecked) {
        mModuleShareableFactObj.titleDescriptionAlignSSSChecked(titleText, descriptionText, alignSelected, isSocialShareSupressChecked);
        mModuleShareableFactObj.verifyLabels();
        mModuleShareableFactUI.cancel();
    },
    titleDescriptionAlignSSSChecked: function(titleText, descriptionText, alignSelected, isSocialShareSupressChecked){
        mModuleShareableFactUI.titleSet(titleText);
        mModuleShareableFactUI.descriptionSet(descriptionText);
        mModuleShareableFactUI.alignSet(alignSelected);
        mModuleShareableFactUI.supressSocialShareChkBoxSet(isSocialShareSupressChecked);
    },
    verifyLabels: function () {
        var titleLable = mModuleShareableFactUI.titleLabelGet();
        var descriptionLabel = mModuleShareableFactUI.descriptionLabelGet();
        var alignLabel = mModuleShareableFactUI.alignLabelGet();
        var socialShareLabel = mModuleShareableFactUI.supressSocialShareLabelGet();

        expect(titleLable).to.equal('Title');
        expect(descriptionLabel).to.equal('Description');
        expect(alignLabel).to.equal('Align');
        expect(socialShareLabel).to.equal('Suppress Social Share');
    },
    verifyTitleDescriptionAlignSocialSS: function (titleText) 
    {
       var title= mModuleShareableFactUI.defaulttitleGet().toLowerCase();
        expect(title).to.equal(titleText.toLowerCase());
        mModuleShareableFactUI.cancel();
    }
}

module.exports = mModuleShareableFactObj;