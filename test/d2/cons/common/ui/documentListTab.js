module.exports = {
    selectDocumentListTab: function(){
            
    },
    selectItemByName: function(assetName){
         browser.click("//span[@title='" + assetName + "']");
         browser.pause(1000);
    }
}