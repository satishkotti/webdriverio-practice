var ModuleUI = require('./../ui/module');

var ModuleObj = {

    selectModuleTypeSearchText: function (moduleType, moduleSearch) {
        ModuleUI.setModuleType(moduleType);
        ModuleUI.setModuleSearchValue(moduleSearch);
        ModuleUI.clickModuleSearchResult();
        ModuleUI.selectModule();
    },
    moduleTitle: function (moduleTitle) {
        ModuleUI.moduletitle(moduleTitle);
    },
    moduleCancel: function () {
        ModuleUI.cancelModule();
    },
    setTitleAndInsert: function(titleVal) {
        ModuleUI.setModuleTitle(titleVal);
        ModuleUI.insertModule();
    },
    verifySocialSharingExists: function () {
        var socialshare = ModuleUI.moduleSocialShare();
        expect(socialshare).to.be.true;
    },
    verifySocialSharingNotExists: function () {
        var socialshare = ModuleUI.moduleSocialShare();
        expect(socialshare).to.be.false;
    },
    verifyModuleSizeField: function () {
        var sizelabel = ModuleUI.getModulesizelabel();
        expect(sizelabel).to.be.false;

        var sizefield = ModuleUI.getModulesizefield();
        expect(sizefield).to.be.false;
    }
}

module.exports = ModuleObj;