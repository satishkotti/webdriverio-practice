var documentListUI = require('./../ui/documentListTab');

var documentListObj = {
    selectDocumentListTab: function(){
        documentListUI.selectDocumentListTab();
    },
    openFolder: function(folderPath){

        var folerPathArr = folderPath.split('/');
         do {
                if(folerPathArr && folerPathArr.length > 0)
                {
                    repositoryBrowserPage.openFolder(folerPathArr[0]); 
                    folerPathArr.shift();
                }
            } while(folerPathArr && folerPathArr.length > 0)

//Add: assert folder selected and ui rendered.
    },
    selectAsset: function(assetName){
        documentListUI.selectItemByName(assetName);

//Add logic for pagination if asset not found.
//Add: assert asset selected is highlighted        
    },
    powerPromoteAsset: function(assetName){
        documentListUI.powerPromote(assetName);
    },
    publishAssetToStaging: function(assetName){
        documentListUI.publishToStaging(assetName);
    },
    assetPowerPromotePublishToStaging:function(assetName){
        documentListObj.selectAsset(assetName);
        documentListObj.powerPromoteAsset(assetName);
        documentListObj.publishAssetToStaging(assetName);
    },
    verifyVersions: function(version){
        var IsVersionVerified = documentListUI.selectVersionTab(version);
        return IsVersionVerified;
    },
    verifyPubSectionRelations: function(){
         documentListUI.verifyPubSectionRelations();
     },
     verifyLock: function(objName){
        var IsLocked = documentListUI.verifyLock(objName);
        return IsLocked;
    },
    promoteAsset: function(assetName){
        documentListUI.promoteAsset(assetName);
    },
    demoteAsset: function(assetName){
        documentListUI.demoteAsset(assetName);
    },
    powerPromoteAsset: function(assetName){
        documentListUI.powerPromote(assetName);
    },
    expireAsset: function(assetName){
    documentListUI.expireAsset(assetName);
    },
    copyArticle:function(data){
        documentListUI.copyArticle(data);
    },
    searchCopyArticle:function(data)
     {
         documentListUI.searchCopyArticle(data);
     },
     deleteArticle:function(assetName,DeleteVersionType){
         documentListUI.deleteArticle(assetName,DeleteVersionType);
     },
     searchArticle:function(data, title)
     {
         documentListUI.searchArticle(data, title);
     },
     selectItemByNamePagination: function (assetName) {
         documentListUI.selectItemByNamePagination(assetName);
     },
}
module.exports = documentListObj;