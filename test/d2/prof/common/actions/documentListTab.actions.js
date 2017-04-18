var documentListUI = require('./../ui/documentListTab');
var pointerRelation =require('./../ui/pointer');

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
     selectItemByNamePagination: function (assetName) {
         documentListUI.selectItemByNamePagination(assetName);
     },
    checkoutObject: function(objName){
        documentListUI.checkoutObject(objName);
    },
     checkinObject: function(objName){
        documentListUI.checkinObject(objName);
    },
    cancelCheckOutObject: function(objName){
        documentListUI.cancelCheckOutObject(objName);
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
    schedulePublishAsset: function(assetName){
        documentListUI.schedulePublishAsset(assetName);
    },
    expireAsset: function(assetName){
    documentListUI.expireAsset(assetName);
    },
    publishAssetToStaging: function(assetName){
        documentListUI.publishToStaging(assetName);
    },
    assetPowerPromotePublishToStaging:function(assetName){
        documentListObj.selectAsset(assetName);
        documentListObj.powerPromoteAsset(assetName);
        documentListObj.publishAssetToStaging(assetName);
    },
    verifyPointerRelation: function(){
        documentListUI.selectRelationTab();
         pointerRelation.pointerRelation();
     },
    verifyVersions: function(version){
        var IsVersionVerified = documentListUI.selectVersionTab(version);
        return IsVersionVerified;
    },
    verifyLock: function(objName){
        var IsLocked = documentListUI.verifyLock(objName);
        return IsLocked;
    },
    deleteArticle:function(assetName,DeleteVersionType){
         documentListUI.deleteArticle(assetName,DeleteVersionType);
     },
     searchArticle:function(data,title)
     {
         documentListUI.searchArticle(data,title);
     },

}
module.exports = documentListObj;