var contentTabUI = require('./../ui/contentTab');

var contentTabObj = {
    checkOut: function(){
        contentTabUI.selectContenTab();
        contentTabUI.ExpandContentTab();
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.checkOut();
    },
    checkIn: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.checkIn();
        contentTabUI.CollapseContentTab();
    },
    cancel: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.cancelCheckoutConfirmYes();
    },

     AssetcheckOut: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.checkOut();
    },
    edit: function(){},
    spell: function(){},
    find: function(){},
    info: function(){},
    preview: function(){},
    previewATS: function(){},
    clearSectionTextValue : function(data){
         contentTabUI.switchToExternalWidgetFrame();
         contentTabUI.clearSectionTextValue();
    },
    Titleinputsetvalue:function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.Titleinputsetvalue(data);
    },
    sectionTextSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.sectionTextSetValue(data);
    },
     sectionHeaderSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.sectionHeaderSetValue(data);
    },
    
    contenttabframeswitching: function(){
        contentTabUI.switchToExternalWidgetFrame();
    },
    highlightsSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.highlightsSetValue(data);
    },
    pullQuotesSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.pullQuotesSetValue(data);
    },
     citationsSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.citationsSetValue(data);
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

     relatedLinksSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.relatedLinksSetValue(data);
        
    },

     RelatedLinkHeaderSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.RelatedLinkHeaderSetValue(data);
        
    },

     QuestionTextSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.QuestionTextSetValue(data);
        
    },
    QuestiontypeSelectText:function()
    {
      contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.QuestiontypeSelectText("3");

    },
     ResultTextSetValue: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.ResultTextSetValue(data);
        
    },
    relatedLinksAndClickmModuleMenu: function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.relatedLinksSetValue(data);
        contentTabObj.mModuleckEditorMenuClick(5);
    },
    Setimage: function(Imageloc,Imagetype){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.ImageClick(Imageloc);
        contentTabObj.selectImageSearch(Imagetype);
        browser.frameParent();
    },
    selectImageSearch: function (searchimagetype) {
        contentTabUI.setImageType("Image");
        contentTabUI.setImageSearchValue(searchimagetype);
        contentTabUI.clickImageSearchResult();
        contentTabUI.selectImage();
    },
    ImagelinkVal: function(Imageloc){
        contentTabUI.switchToExternalWidgetFrame();
        var ImagelinkVal=contentTabUI.ImagelinkVal(Imageloc);
        browser.frameParent();
        return ImagelinkVal;
    },

    cancelcheckout: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.cancelCheckout();
    },
    contentHeaderGet:function()
    {
        return contentTabUI.contentHeaderGet();
    },
     Assetcheckin: function(){
        contentTabUI.selectContenTab();
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.checkIn();
    },
   
}
module.exports = contentTabObj;