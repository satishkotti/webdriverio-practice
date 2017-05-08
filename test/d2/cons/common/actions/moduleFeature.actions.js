var ModuleUI = require('./../ui/moduleFeature');

var ModuleObj = {
    moduleframe: function() {
        browser.frameParent();
    },
    cancelImageModuleFeature: function (featureModuleTitle, featureAssetTitle, featureAssetDescription, alignLeftOption) {
        ModuleObj.moduleframe();
        ModuleUI.setValueFeatureTemplate(featureModuleTitle, featureAssetTitle, featureAssetDescription);
        ModuleObj.verifyModuleLabels();
        ModuleObj.verifyModuleValues(featureModuleTitle, featureAssetTitle, featureAssetDescription, alignLeftOption);
        ModuleUI.selectCancelButton();
    },
    insertImageModuleFeature: function (featureModuleTitle, featureAssetTitle, featureAssetDescription, alignLeftOption) {
        ModuleObj.moduleframe();
        ModuleUI.setValueFeatureTemplate(featureModuleTitle, featureAssetTitle, featureAssetDescription);
        ModuleObj.verifyModuleLabels();
        ModuleObj.verifyModuleValues(featureModuleTitle, featureAssetTitle, featureAssetDescription, alignLeftOption);
        ModuleUI.selectInsertButton();
    },
    verifyModuleLabels: function () {
        var modTitleLabel = ModuleUI.getModuleTitleLabel();
        var assetTitleLabel = ModuleUI.getAssetTitleLabel();
        var assetDescriptionLabel = ModuleUI.getAssetDescriptionLabel();
        var chronicleIdLabel = ModuleUI.getChronicleIdLabel();
        var alignLabel = ModuleUI.getAlignLabel();
        var thumbnailLabel = ModuleUI.getThumbnailLabel();
        var socialShareLabel = ModuleUI.getmoduleSocialShareLabel();
        expect(modTitleLabel).to.equal(global.d2ConDataSettings.featureTemplate.moduleTitleLabel);
        expect(assetTitleLabel).to.equal(global.d2ConDataSettings.featureTemplate.assetTitleLabel);
        expect(assetDescriptionLabel).to.equal(global.d2ConDataSettings.featureTemplate.assetDescriptionLabel);
        expect(chronicleIdLabel).to.equal(global.d2ConDataSettings.featureTemplate.chronicleIdLabel);
        expect(alignLabel).to.equal(global.d2ConDataSettings.featureTemplate.alignLabel);
        expect(thumbnailLabel).to.equal(global.d2ConDataSettings.featureTemplate.thumbnailLabel);
        expect(socialShareLabel).to.equal(global.d2ConDataSettings.featureTemplate.suppressSocialLabel);
    },
    verifyModuleValues: function (modTitleVal, assetTitleVal, assetDescriptionVal, alignVal ) {
        var modTitleValue = ModuleUI.getModuleTitleValue();
        var assetTitleValue = ModuleUI.getAssetTitleValue();
        var assetDescriptionValue = ModuleUI.getAssetDescriptionValue();
        var alignValue = ModuleUI.getAlignValue();
        expect(modTitleValue).to.equal(modTitleVal);
        expect(assetTitleValue).to.equal(assetTitleVal);
        expect(assetDescriptionValue).to.equal(assetDescriptionVal);
        expect(alignValue).to.equal(alignVal);
    }

}

module.exports = ModuleObj;