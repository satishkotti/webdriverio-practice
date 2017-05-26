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
        CopyrightUI.publishingTabSelect();
        CopyrightUI.RetentionDateSet();
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

    VerifyDropdownlistVal: function(Selector,responseval){
        propertiesTabUI.propertiesTabSelect();
        propertiesTabUI.edit();
        CopyrightUI.dropdownlistSelect(Selector,responseval);
        if (!responseval.includes("/"))
             expect(CopyrightUI.verifyValue(responseval)).to.be.true;
        propertiesTabUI.cancelEdit();

    }

    
}

module.exports = CopyrightObj;