var maxWaitTimeInMs = 50000;

module.exports = {
    selectRepositoryBrowserTab: function(){
            
    },
    openFolder: function(nodeName){
        var folderSelector = "//div[@aria-label='"+nodeName+"']/span[text()='"+ nodeName +"']";
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

