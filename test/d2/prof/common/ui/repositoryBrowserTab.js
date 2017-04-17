var maxWaitTimeInMs = 60000;

module.exports = {
    selectRepositoryBrowserTab: function(){
            
    },
    openFolder: function(nodeName, folderLevel){
        var folderSelector = "//div[@aria-label='"+nodeName+"' and @aria-level='"+folderLevel+"']/span[text()='"+ nodeName +"']";

    //     var isExistmore= browser.isExisting('//span[contains(.,"More")]');  
    //     if(isExistmore==true)         
    //     {      
    //     browser.timeoutsImplicitWait(6000);   
    //     browser.element('//span[contains(.,"More")]').click();  
    //     }  
        
        browser.waitForExist(folderSelector, maxWaitTimeInMs);
        browser.moveToObject(folderSelector,0,0);
        browser.waitForVisible(folderSelector, maxWaitTimeInMs);
        browser.click(folderSelector); 
        browser.pause(2000);
    },
    repositorybrowserRefresh: function (){
        browser.leftClick("//span[contains(.,'Repository browser')]//following-sibling::span[@id='menuDownArrow-button' and @role=not('button')]");
        browser.leftClick("//span[@id='refreshWidget-menuItem']");
        browser.pause(2000);
    }
}

