var IDefinationUI = require('./../ui/DefinationTemplate');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');


var CopyrightObj = {
   CopyrightStatementText: function(Textvalue){
        contentTabUI.switchToExternalWidgetFrame();
        CopyrightUI.CopyrightStatementSetValue(Textvalue);
    },


     CpygetChronicleIdAndName: function(){
        propertiesTabUI.propertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet()
           
        };
    },
IDefntnMandatoryfieldsValidation: function(){
       propertiesTabUI.propertiesTabSelect();
       propertiesTabUI.edit();
       propertiesTabUI.save();
       IDefinationUI.DefenationtemplateMandatoryfieldsValidation();
    },  

IDefntn_Othertab_AttributesNames: function (){
        IDefinationUI.article_Othertab_AttributesNames();
      },

  

setRequiredPropertiesPublishngTab: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        IDefinationUI.publishingTabSelect();
        IDefinationUI.EfectiveDateSet();
        IDefinationUI.ExpirationDateSet();
        propertiesTabUI.save();
    },
        
    

 setRequiredPropertiesOthr: function(subject,languge_code){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        CopyrightUI.otherTabSelect();
        CopyrightUI.TitleSet(subject);
        CopyrightUI.CopyrightHolderSet(languge_code);
        propertiesTabUI.save();
    },
    
 propertyLabelValidation: function () {
        browser.pause(10000);
        propertiesTabUI.propertiesTabSelect();        
        IDefinationUI.article_Othertab_AttributesNames();
        IDefinationUI.article_AuthRevtab_AttributesNames();
        IDefinationUI.article_AudChartab_AttributesNames();
        IDefinationUI.article_SponsorMLRtab_AttributesNames();

    },

      Terminputsetvalue:function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.Terminputsetvalue(data);
    },

      Pronunciationinputsetvalue:function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.Pronunciationsetvalue(data);
    },

       Definitioninputsetvalue:function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.Definitioninputsetvalue(data);
    },

      Etymologysetvalue:function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.Etymologysetvalue(data);
    },

     Citationssetvalue:function(data){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.Citationssetvalue(data);
    }

}

module.exports = CopyrightObj;