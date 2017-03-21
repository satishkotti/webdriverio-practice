var contentTabActions= require('./contentTab.actions');
var contentTabUI = require('./../ui/contentTab');

var ckEditorObj = {
    mModuleckEditorMenuClick: function(sectionIndex){
        contentTabUI.switchToExternalWidgetFrame();
        contentTabUI.mModuleckEditorMenuClick(sectionIndex);
    },
    mModuleCodeMenuClick: function(sectionIndex)
    {
        contentTabUI.switchTomModuleMenuFrame();
        var selectedOption = contentTabUI.mModuleCodeMenuClick(sectionIndex);
        expect(selectedOption).to.equal('Code');
    },
  /*  ModuleMenuClick: function(sectionIndex)
    {
        contentTabUI.switchTomModuleMenuFrame();
        contentTabUI.ModuleckEditorMenuClick(sectionIndex);
    },*/
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
    },
    sectionTextModuleMenuClick: function(){
        contentTabUI.ModuleckEditorMenuClick(1);

    }   
}
module.exports = ckEditorObj;