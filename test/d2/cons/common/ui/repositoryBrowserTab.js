var maxWaitTimeInMs = 50000;

module.exports = {
    selectRepositoryBrowserTab: function () {
        browser.click("//span[text()='Repository browser']")
        browser.waitForExist("div.x-tree3-el");
    },
    openFolder: function (nodeName, folderLevel) {

        var folderSelector = "//div[@aria-level='" + folderLevel + "']//span[text()='" + nodeName + "']";
        var isExistmore = browser.isExisting('//span[contains(.,"More")]');  

//console.log('repo browser' + folderSelector);

        if (isExistmore == true) {          
            browser.waitForVisible('//span[contains(.,"More")]');    
            browser.element('//span[contains(.,"More")]').click();
            browser.pause(2000);
        }

        browser.waitForText(folderSelector, maxWaitTimeInMs);
        browser.click(folderSelector); 
        
        browser.execute(
            function () {
                var divElm = document.getElementsByClassName("x-tree3")[0];
                divElm.scrollTop = divElm.scrollHeight;
            });

        browser.pause(2000);
        browser.execute(
            function () {
                var divElm = document.getElementsByClassName("x-tree3")[0];
                divElm.scrollTop = (divElm.scrollHeight * 2);
            });
    },
    RepositoryRefresh: function () {    
        browser.waitForVisible('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');
        browser.click('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');
        browser.waitForVisible("//*[@id='refreshWidget-menuItem']");
        browser.click("//*[@id='refreshWidget-menuItem']");
        browser.pause(2000);
    }
}
