var pagebuilderAssets = require('./../ui/pagebuilderAssets');
var propertiesTabUI = require('./../ui/propertiesTab');

module.exports = {
   pagebuilderPage :function(){
       propertiesTabUI.propertiesTabSelect();
       pagebuilderAssets.pagebuilderPage_Pagetab_AttributesNames();
       pagebuilderAssets.pagebuilderPage_Pagetab_AttributesTags();
       pagebuilderAssets.pagebuilderAsset_Othertab_AttributesNames();
       pagebuilderAssets.pagebuilderAsset_Othertab_AttributesTag();
       pagebuilderAssets.pagebuilderAsset_Publishingtab_AttributesNames();
       pagebuilderAssets.pagebuilderAsset_Publishingtab_AttributesTag();
   }
}