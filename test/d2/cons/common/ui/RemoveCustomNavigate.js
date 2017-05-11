var maxWaitTimeInMs = 30000;

var RemoveCustomNavgtUIObj = {
    
   
    GetfolderText: function(folderval){
       
           
        RemoveCustomNavgtUIObj.VerifyfolderExists("//td[@class='x-btn-mc']//button[contains(string(),'"+folderval+"')]");
        return browser.getText("//td[@class='x-btn-mc']//button[contains(string(),'"+folderval+"')]");
        

    }  ,


     VerifyfolderExists: function (folderval) {
        if (!browser.isExisting(folderval)) {            
            browser.waitForExist(folderval, maxWaitTimeInMs);
        }
    }
}

module.exports = RemoveCustomNavgtUIObj;