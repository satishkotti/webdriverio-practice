var maxWaitTimeInMs = 20000;

var ModuleUIObj = {
    moduleSelect: function(moduleType, moduleSearch) {
        ModuleUIObj.ModuleSelectvalue(moduleType);
         ModuleUIObj.moduleSearchValue(moduleSearch);
          ModuleUIObj.moduleSelectSearchResult();
          ModuleUIObj.selectModule();
    },
    ModuleSelectvalue: function (moduleType) {
        browser.pause(1000);
        browser.click("select[ng-model='moduleConfig.moduleType']");
        browser.click("//option[contains(.,'"+moduleType+"')]");
        browser.pause(1000);
    },
    moduleSearchValue: function (moduleSearch) {
        browser.setValue("input[placeholder='Search by keyword']",moduleSearch);
        browser.click("span[class='input-group-addon']");
        browser.pause(5000);
    },
    moduleSelectSearchResult: function (moduleSearch) {
        browser.click("//div[@class='modal-body']//tr[2]//td[2]");
        browser.pause(5000);
    },
    selectInsertButton: function () {
        browser.click("//button[contains(.,'Insert')]");
    },
    selectCancelButton: function () {
        browser.click("//button[contains(.,'Cancel')]");
    },    
    setValueFeatureTemplate: function (featureModuleTitle, featureAssetTitle, featureAssetDescription) {
        ModuleUIObj.moduleSelect('Image','heart');
        browser.waitForVisible("#moduletitle", 10000);
        browser.setValue("#moduletitle", featureModuleTitle);
        browser.setValue("#assettitle", featureAssetTitle);
        browser.setValue("#assetdescription", featureAssetDescription);
        browser.click("//input[@id='editmodule-suppressShare']/following-sibling::label[contains(.,global.d2ConDataSettings.featureTemplate.suppressSocialLabel)]");
    },
    selectModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Select')]");
        browser.pause(1000);
    },
    insertModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Insert')]");
        browser.pause(1000);
    },
    getmoduleSocialShareLabel: function () {
        var socialshareLabel = browser.getText("//label[@data-test='editmodule-suppresssocialsharelabel']");
        return socialshareLabel; 
    },
    getmoduleSocialShareValue: function () {
        var socialshare = browser.getValue("//input[@id='editmodule-suppressShare']/following-sibling::label[contains(.,'Suppress Social Share')]");
        return socialshare; 
    },
    getModuleTitleLabel: function () {
        var titleLabel = browser.getText("//div[@class='row']//div[contains(.,'Module Title')]");
        return titleLabel; 
    },
    getAssetTitleLabel: function () {
        var assetTitleLabel = browser.getText("//div[@class='row']//div[contains(.,'Asset Title')]");
        return assetTitleLabel; 
    },
    getAssetDescriptionLabel: function () {
        var assetTitleDescription = browser.getText("//div[@class='row']//div[contains(.,'Asset Description')]");
        return assetTitleDescription; 
    },
    getChronicleIdLabel: function () {
        var chronicleIdLabel = browser.getText("//div[@class='row']//div[contains(.,'Chronicle Id')]");
        return chronicleIdLabel; 
    },
    getAlignLabel: function () {
        var alignLabel = browser.getText("//div[@class='row']//div[contains(.,'Align')]");
        return alignLabel; 
    },
    getThumbnailLabel: function () {
        var thumbnailLabel = browser.getText("//div[@class='row']//div[contains(.,'Thumbnail')]");
        return thumbnailLabel; 
    },
    getModuleTitleValue: function () {
        return browser.getValue("#moduletitle");
    },
    getAssetTitleValue: function () {
        return browser.getValue("#assettitle");
    },
    getAssetDescriptionValue: function () {
        return browser.getValue("#assetdescription");
    },
    getAlignValue: function () {
        var alignValue = browser.element("select[ng-model='module.align']");
            return alignValue.getValue(); 
    }

}

module.exports = ModuleUIObj;