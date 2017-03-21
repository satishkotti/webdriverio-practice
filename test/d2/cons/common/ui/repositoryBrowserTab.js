var maxWaitTimeInMs = 20000;

module.exports = {
    selectRepositoryBrowserTab: function(){
            
    },
    openFolder: function(nodeName){
        var folderSelector = "//div[@aria-label='"+nodeName+"']/span[text()='"+ nodeName +"']";

        var isExistmore= browser.isExisting('//span[contains(.,"More")]');  

        if(isExistmore==true)         
        {      
        browser.timeoutsImplicitWait(6000);   
        browser.element('//span[contains(.,"More")]').click();  
        }  
        
        browser.waitForExist(folderSelector, maxWaitTimeInMs);
        browser.click(folderSelector); 
        
        browser.execute( 
            function (){
                var divElm = document.getElementsByClassName("x-tree3")[0];
                divElm.scrollTop = divElm.scrollHeight;
            });

        browser.pause(2000);
        browser.execute( 
            function (){
                var divElm = document.getElementsByClassName("x-tree3")[0];
                divElm.scrollTop = (divElm.scrollHeight * 2);
            });
    }
}

