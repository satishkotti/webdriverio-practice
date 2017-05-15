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
    assetPowerPromotePublishToStaging: function(assetName){
        documentListObj.selectDocumentListTab();
        documentListObj.selectAsset(assetName);
        documentListObj.powerPromoteAsset(assetName);
        documentListObj.publishAssetToStaging(assetName);
    },
    
     CheckVersionvalue: function(assetName){
        documentListUI.CheckVersionvalue(assetName);
    },
}
module.exports = documentListObj;