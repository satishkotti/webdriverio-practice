var CopyrightUI = require('./../ui/CopyrightTemplate');
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
copyrightMandatoryfieldsValidation: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
       propertiesTabUI.save();
       CopyrightUI.copyrightMandatoryfieldsValidation();
    },  

    copyright_Othertab_AttributesNames: function (){
        CopyrightUI.copyright_Othertab_AttributesNames();
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

        propertiesTabUI.save();
    },

     setRequiredPropertiesPublishngTab: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        CopyrightUI.publishingTabSelect();
        CopyrightUI.EfectiveDateSet();
        CopyrightUI.ExpirationDateSet();
        propertiesTabUI.save();
    },
        
     setRequiredPropertiesOthers: function(subject,languge_code){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        CopyrightUI.otherTabSelect();
        CopyrightUI.SubjectSet(subject);
        CopyrightUI.LanguagecodeSet(languge_code);
        propertiesTabUI.save();
    },

    VerifyDropdownlistVal: function(Selector,response)
    {
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
         var existingval= CopyrightUI.dropdownlistSelect(Selector);

         for(i=0; i < response.length; i++)
        {
         expect(existingval[i].trim()).to.equal(response[i][1].title.trim());
        }
    
    
       
        propertiesTabUI.cancelEdit();

   

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