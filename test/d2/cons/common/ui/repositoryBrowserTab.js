var maxWaitTimeInMs = 50000;

module.exports = {
    selectRepositoryBrowserTab: function () {
        browser.click("//span[text()='Repository browser']")
        browser.waitForExist("div.x-tree3-el");
    },
    openFolder: function (nodeName, folderLevel) {

        var folderSelector = "//div[@aria-level='" + folderLevel + "']//span[text()='" + nodeName + "']";
        var isExistmore = browser.isExisting('//span[contains(.,"More")]'); 
        var folderExist = browser.isExisting(folderSelector) ;

//console.log('repo browser' + folderSelector);

        if (isExistmore == true && folderExist== false) {          
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
    },
     ExpandContentTab: function () {
        browser.waitForVisible('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');
        browser.click('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');


        if (browser.isExisting("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Expand']")) {
            browser.click("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Expand']");
            browser.pause(5000);
        }
    },
    CollapseContentTab: function () {
        browser.waitForVisible('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');
        browser.click('//span[contains(.,"Repository browser")]//*[@id="menuDownArrow-button"]');

        if (browser.isExisting("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Collapse']")) {
            browser.click("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Collapse']");
            browser.pause(5000);
        }
    }
}
