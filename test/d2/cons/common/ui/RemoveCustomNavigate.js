var maxWaitTimeInMs = 30000;

var RemoveCustomNavgtUIObj = {
    
   
    GetfolderText: function(folderval){
       
         
            RemoveCustomNavgtUIObj.VerifyfolderExists("//td[@class='x-btn-mc']//button[text()='"+folderval+"']");
            return  browser.getText("//td[@class='x-btn-mc']//button[text()='"+folderval+"']");
    }  ,


     VerifyfolderExists: function (folderval) {
        if (!browser.isExisting(folderval)) {            
            browser.waitForExist(folderval, maxWaitTimeInMs);
        }
    },
 logoutWindow: function (folderval) {
       browser.waitForVisible('//*[@id="*menuUser"]//button',maxWaitTimeInMs);
        browser.click('//*[@id="*menuUser"]//button');
        browser.waitForVisible('#menuUserLogout', maxWaitTimeInMs);
        browser.click('#menuUserLogout');
 }

}

module.exports = RemoveCustomNavgtUIObj;