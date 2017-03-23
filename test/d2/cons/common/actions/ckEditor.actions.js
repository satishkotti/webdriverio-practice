var contentTabActions= require('./contentTab.actions');
var contentTabUI = require('./../ui/contentTab');

var ckEditorObj = {
    mModuleckEditorMenuClick: function(sectionIndex){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.mModuleckEditorMenuClick(sectionIndex);
    },
    mModuleSubMenuClick: function(menuOptionName, sectionIndex)
    {
        contentTabUI.switchTomModuleMenuFrame();
        var selectedOption = contentTabUI.mModuleSubMenuOptionClick(menuOptionName,sectionIndex);
        expect(selectedOption).to.equal(menuOptionName);
    },
    mModuleCodeMenuClick: function(sectionIndex)
    {
        contentTabUI.switchTomModuleMenuFrame();
        var selectedOption = contentTabUI.mModuleCodeMenuClick(sectionIndex);
        expect(selectedOption).to.equal('Code');
    },
    sectionTextmModuleSelectModuleClick: function(mModuleOptionName){
        contentTabUI.mModuleckEditorMenuClick(1);
        ckEditorObj.mModuleSubMenuClick(mModuleOptionName, 1);
    },
    sectionTextCodeMenuClick: function(){
        contentTabUI.mModuleckEditorMenuClick(1);
        ckEditorObj.mModuleCodeMenuClick(1);
    },
    highlightsCodeMenuClick: function(){
        contentTabUI.mModuleckEditorMenuClick(2);
        ckEditorObj.mModuleCodeMenuClick(2);
    },
    pullQuotesCodeMenuClick: function(){
        contentTabUI.mModuleckEditorMenuClick(3);
        ckEditorObj.mModuleCodeMenuClick(3);
    },
    citationsCodeMenuClick: function(){
        contentTabUI.mModuleckEditorMenuClick(4);
        ckEditorObj.mModuleCodeMenuClick(4);
    },
    relatedLinksCodeMenuClick: function(){
       contentTabUI.mModuleckEditorMenuClick(5);
        ckEditorObj.mModuleCodeMenuClick(5);
    }    
}
module.exports = ckEditorObj;