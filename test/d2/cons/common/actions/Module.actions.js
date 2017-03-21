var ModuleUI = require('./../ui/Module');

var ModuleObj = {
    moduleframe: function() {
        browser.frameParent();
    },

   /* moduleselect: function(moduleType) {
        ModuleUI.ModuleSelectvalue(moduleType);
    },

     moduleSearch: function(moduleSearch) {
       
    },
    moduleSearchSelect: function(){
        ModuleUI.moduleSelectSearchResult();
},*/

    moduleSelect: function(moduleType, moduleSearch) {
        ModuleUI.ModuleSelectvalue(moduleType);
         ModuleUI.moduleSearchValue(moduleSearch);
          ModuleUI.moduleSelectSearchResult();
          ModuleUI.selectModule();
    },

    moduleSizeLabel: function() {
      var sizelabel= ModuleUI.modulesizelabel();
      return sizelabel;
      
    },
     moduleSizeField: function() {
      var sizefield= ModuleUI.modulesizefield();
      return sizefield;
      
    },

    moduleSocialShare: function() {
      var socialshare= ModuleUI.moduleSocialShare();
      return socialshare;
      
    },
     moduleCancel: function(){
         ModuleUI.cancelModule();
     }
    


  /*  addCodeAndTypeInsert: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.insertCode(codeText, codeType);
    },
    addCodeAndTypeCancel: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyLabels();
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.cancelCode(codeText, codeType);
    },
    updateCodeAndTypeCancel: function (codeText, codeType) {
        codeUI.codeAndTypeSetValue(codeText, codeType);
        mModuleCodeObj.verifyCodeAndType(codeText, codeType);
        codeUI.updateCode(codeText, codeType);
    },
    verifyLabels: function () {
        var codeLabel = codeUI.getCodeLabel();
        var codeTypeLabel = codeUI.getCodeTypeLabel();
        expect(codeLabel).to.equal('Code');
        expect(codeTypeLabel).to.equal('Code Type');
    },
    verifyCodeAndType: function (codeText, codeType) {
        var codeVal = codeUI.getCodeValue();
        var codeTypeVal =codeUI.getCodeTypeValue();

        expect(codeVal).to.equal(codeText);
        expect(codeTypeVal.toLowerCase()).to.equal(codeType.toLowerCase());
}*/
}

module.exports = ModuleObj;