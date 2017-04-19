var maxWaitTimeInMs = 60000;

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

        browser.waitForExist(folderSelector, maxWaitTimeInMs);
        browser.moveToObject(folderSelector, 0, 0);
        browser.click(folderSelector); 
        browser.pause(2000);
        browser.execute(
            function () {
                var divElm = document.getElementsByClassName("x-tree3")[0];
                divElm.scrollTop = divElm.scrollHeight;
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
    },
    repositorybrowserRefresh: function (){
        browser.leftClick("//span[contains(.,'Repository browser')]//following-sibling::span[@id='menuDownArrow-button' and @role=not('button')]");
        browser.leftClick("//span[@id='refreshWidget-menuItem']");
        browser.pause(2000);
    }
}