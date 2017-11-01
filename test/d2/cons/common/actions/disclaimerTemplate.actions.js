var disclaimerUI = require('./../ui/disclaimer');
var contentTabUI = require('./../ui/contentTab');
var propertiesTabUI = require('./../ui/propertiesTab');


module.exports = {
   DisclaimerStatementText: function(Textvalue){
        contentTabUI.switchToExternalWidgetFrame();
        disclaimerUI.DisclaimerStatementSetValue(Textvalue);
    },


     disclaimergetChronicleIdAndName: function(){
        propertiesTabUI.propertiesTabSelect();
        return {
            chronicleId: propertiesTabUI.chronicleIdGet()
           
        };
    },

  setRequiredProperties: function(Lglrvwrset){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        disclaimerUI.LegalReviewerSet(Lglrvwrset);
        disclaimerUI.LegalReviewDateSet();
        propertiesTabUI.save();
    },

     setRequiredPropertiesPublishngTab: function(){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        disclaimerUI.publishingTabSelect();
        disclaimerUI.EfectiveDateSet();
        disclaimerUI.ExpirationDateSet();
        propertiesTabUI.save();
    },
        
     setRequiredPropertiesOthers: function(subject,languge_code){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        disclaimerUI.otherTabSelect();
        disclaimerUI.SubjectSet(subject);
        disclaimerUI.LanguagecodeSet(languge_code);
        propertiesTabUI.save();
    },

    VerifyDropdownlistVal: function(Selector,response)
    {
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
         var existingval= disclaimerUI.dropdownlistSelect(Selector);

         for(i=0; i < response.length; i++)
        {
         expect(existingval[i].trim()).to.equal(response[i][1].title.trim());
        }
        propertiesTabUI.cancelEdit();

    },


     setRequiredPropertiesOthr: function(subject,languge_code){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        disclaimerUI.otherTabSelect();
        disclaimerUI.TitleSet(subject);
        disclaimerUI.CopyrightHolderSet(languge_code);
        propertiesTabUI.save();
    },
 
     SQLLegalReviewerrpropertiesValidation: function(){
          propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        return disclaimerUI.legalreviewerValidation();
     },
        disclaimerPublicationModify: function(AssetName){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        disclaimerUI.disclaimerPublicationFieldEdit(AssetName);
        propertiesTabUI.save();

      },
       disclaimer_Othertab_AttributesNames: function (){
        propertiesTabUI.propertiesTabSelect();
        disclaimerUI.disclaimer_Othertab_AttributesNames();
      },


}
