var nonTemplateFiles = require('./../ui/nonTemplateFiles');
var propertiesTabUI = require('./../ui/propertiesTab');
var versionTabUI = require('./../ui/versionTab');

var nonTemplateFilesObj = {

    importConsumerArticle: function (filetoupload, profile, objName, descName, friendlyName, busRef, userDescr, keywords, windowTtl, publication,
        primaryTopicId, assetName, assetName, filetoupload) {
        nonTemplateFiles.importConsumerArticle(filetoupload);
        nonTemplateFiles.importConsumerArticleProfile(profile);
        nonTemplateFiles.validationArticleProperties();
        nonTemplateFiles.setMandatoryProperties(objName, descName, friendlyName, busRef, userDescr, keywords, windowTtl, publication,
            primaryTopicId);
        nonTemplateFilesObj.propertyLabelValidation(assetName);
        versionTabUI.versionValidation();
        nonTemplateFilesObj.fileOperations(assetName, filetoupload)

    },
    importMultipleConsumerArticle: function (filetoupload, filetoupload2, profile, objName, descName, friendlyName, busRef, userDescr, keywords, windowTtl, publication,
        primaryTopicId) {
        nonTemplateFiles.importMultipleConsumerArticle(filetoupload, filetoupload2);
        nonTemplateFiles.importConsumerArticleProfile(profile);
        nonTemplateFiles.setMandatoryProperties(objName, descName, friendlyName, busRef, userDescr, keywords, windowTtl, publication,
            primaryTopicId);

    },
    importUnSelectFile: function (filetoupload, filetoupload2) {
        nonTemplateFiles.unSelectFile(filetoupload, filetoupload2);

    },

    fileOperations: function (assetName, filetoupload) {
        nonTemplateFiles.selectItemByName(assetName);
        nonTemplateFiles.checkout(assetName);
        nonTemplateFiles.cancelCheckout(assetName);
        nonTemplateFiles.checkout(assetName);
        nonTemplateFiles.checkin(assetName, filetoupload);
    },
    validationProperties: function (assetName, linkTitle, copyright) {
        nonTemplateFiles.selectItemByName(assetName);
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        propertiesTabUI.linkTitleSet(linkTitle);
        propertiesTabUI.copyrightSet(copyright);
        propertiesTabUI.originalPublishDateSet();
        propertiesTabUI.save();
    },
    propertyLabelValidation: function (assetName) {
        nonTemplateFiles.selectItemByName(assetName);
        propertiesTabUI.propertiesTabSelect();
        nonTemplateFiles.article_Articletab_AttributesNames();
        nonTemplateFiles.article_Othertab_AttributesNames();
        nonTemplateFiles.article_AuthRevtab_AttributesNames();
        nonTemplateFiles.article_AudChartab_AttributesNames();
        nonTemplateFiles.article_SponsorMLRtab_AttributesNames();

    }
}
module.exports = nonTemplateFilesObj;