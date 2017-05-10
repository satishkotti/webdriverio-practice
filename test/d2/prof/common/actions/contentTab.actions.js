var contentTabUI = require('./../ui/contentTab');

var contentTabObj = {
    checkOut: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.checkOut();
    },
    checkIn: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.checkIn();
    },
    cancel: function(){
        contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.cancelCheckOut();
    },
    edit: function(){},
    spell: function(){},
    find: function(){},
    info: function(){},
    preview: function(){},
    previewATS: function(){},
    sectionTextSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.sectionTextSetValue(data);
    },
    highlightsSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.highlightsSetValue(data);
    },
    pullQuotesSetValueAndClickmModuleMenu: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.pullQuotesSetValue(data);
        contentTabObj.mModuleckEditorMenuClick(3);
    },
    citationsAndClickmModuleMenu: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.citationsSetValue(data);
        contentTabObj.mModuleckEditorMenuClick(4);
    },
    relatedLinksAndClickmModuleMenu: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.relatedLinksSetValue(data);
        contentTabObj.mModuleckEditorMenuClick(5);
    },
     abovetitleSetValue: function(data){
        contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.abovetitleSetValue(data);
    },

    updateContentAllFields:function(data)    {
        contentTabObj.checkOut();
        contentTabObj.AllFieldsSetValueForPubSection(data);
        contentTabUI.checkIn();
    },
    contentHeaderGet:function()
    {
        return contentTabUI.contentHeaderGet();
    },

    AllFieldsSetValueForPubSection: function(data){
        //contentTabUI.switchToExternalWidget4Frame();
        contentTabUI.AllFieldsSetValueForPubSection(data);
    },
    updateContent:function(data)    {
        contentTabObj.checkOut();
        contentTabObj.abovetitleSetValue(data);
        contentTabUI.checkIn();
    },
    contentHeaderGet:function()
    {
        return contentTabUI.contentHeaderGet();
    },
    updatePubSubsectionContent:function(data)    {
        contentTabObj.checkOut();
        contentTabObj.titleSetValue(data);
        contentTabUI.checkIn();
    },
     titleSetValue: function(data){
        //contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.titleSetValue(data);
    },

    SetPubsubsectionContentAllProperties: function(AssetTitle,imageTitle){
        contentTabObj.checkOut();
        contentTabUI.titleSetValue(AssetTitle);
        contentTabUI.pubSectionImageSetValue(imageTitle);
        contentTabUI.introductionText(AssetTitle);
         contentTabUI.checkIn();
    },
    updateProfpublicationContent:function(data)    {
        contentTabObj.checkOut();
        contentTabUI.updateProfpublicationContent(data);
        contentTabUI.checkIn();
    },
}

module.exports = contentTabObj;