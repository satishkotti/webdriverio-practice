var CopyrightUI = require('./../ui/CopyrightTemplate');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');

var CopyrightObj = {
   CopyrightStatementText: function(Textvalue){
        contentTabUI.switchToExternalWidgetFrame();
        CopyrightUI.CopyrightStatementSetValue(Textvalue);
    },
  setRequiredPropertiesCpyRights: function(Titlaval,Cpyrghthldr,Lglrvwrset){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        CopyrightUI.TitleSet(Titlaval);
        CopyrightUI.CopyrightHolderSet(Cpyrghthldr);
        CopyrightUI.LegalReviewerSet(Lglrvwrset);
        CopyrightUI.CopyrightStartDateSet();
        CopyrightUI.CopyrightEndDateSet();
        CopyrightUI.LegalReviewDateSet();
      //  CopyrightUI.publishingTabSelect();
     //   CopyrightUI.RetentionDateSet();
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
     validateRequiredPropertiesCpyRights: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
       propertiesTabUI.save();
       CopyrightUI.copyrightMandatoryfieldsValidation();
    },  
     SQLCopyrightholderpropertiesValidation: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        return CopyrightUI.copyrightholderValidation();
     },
     SQLLegalReviewerrpropertiesValidation: function(){
        return CopyrightUI.legalreviewerValidation();
     },
      copyright_Othertab_AttributesNames: function (){
        CopyrightUI.copyright_Othertab_AttributesNames();
      },

      copyrightPublicationModify: function(AssetName){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        CopyrightUI.copyrightPublicationFieldEdit(AssetName);
        propertiesTabUI.save();

      }
  
}

module.exports = CopyrightObj;