var maxWaitTimeInMs = 60000;

module.exports = {
    selectRepositoryBrowserTab: function(){
            
    },
    openFolder: function(nodeName){
        var folderSelector = "//div[@aria-label='"+nodeName+"']/span[text()='"+ nodeName +"']";
        //div[@aria-label='"+arr[0].trim()+"' and @aria-level='"+arr[1].trim()+"'] //Span[contains(text(),'"+arr[0].trim()+"')]

        var isExistmore= browser.isExisting('//span[contains(.,"More")]');  
       
        if(isExistmore==true)         
        {      
        browser.timeoutsImplicitWait(6000);   
        browser.element('//span[contains(.,"More")]').click();  
        }  
        
        browser.waitForExist(folderSelector, maxWaitTimeInMs);
        browser.moveToObject(folderSelector);
        browser.click(folderSelector); 
        
        // browser.execute( 
        //     function (){
        //         var divElm = document.getElementsByClassName("x-tree3")[0];
        //         divElm.scrollTop = divElm.scrollHeight;
        //     });

        browser.pause(2000);
        // browser.execute( 
        //     function (){
        //         var divElm = document.getElementsByClassName("x-tree3")[0];
        //         divElm.scrollTop = (divElm.scrollHeight * 2);
        //     });
    }
}

