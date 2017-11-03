var maxWaitTimeInMs = 50000;

var sortingObj = {

    documentWidgetSelection: function () {
       browser.click("//li[@tag_id='Document list-widgetTab']");
       browser.waitForVisible("//div[@id='x3-docList-panel']//div[contains(@class,'object_name')]");
    },
    favortiesWidgetSelection: function () {
       browser.click("//li[@tag_id='Favorites-widgetTab']");
    },
     favortiesWidgetFolderSelection: function (folder) {
       browser.click("//span[@title='"+folder+"' and @class=not('x-tree3-node-text')]");
        browser.pause(10000);
    },
     descendingSort: function (Type) {
      var type=  browser.getAttribute("//div[@id='x3-docList-panel']//div[contains(@class,'"+Type+"')]","aria-sort");
        for(;type[0]=='descending'||type[0]=='none';){
           browser.leftClick("//div[@id='x3-docList-panel']//div[contains(@class,'"+Type+"')]");
           var type=  browser.getAttribute("//div[@id='x3-docList-panel']//div[contains(@class,'"+Type+"')]","aria-sort"); 
       }
       return browser.getText("//div[@id='x3-docList-panel']//span/span[3]");
    },
    ascendingSort: function (Type) {
      var type=  browser.getAttribute("//div[@id='x3-docList-panel']//div[contains(@class,'"+Type+"')]","aria-sort");
        for(;type[0]=='ascending'||type[0]=='none';){
            browser.leftClick("//div[@id='x3-docList-panel']//div[contains(@class,'"+Type+"')]");
           var type=  browser.getAttribute("//div[@id='x3-docList-panel']//div[contains(@class,'"+Type+"')]","aria-sort"); 
       }
       return AssertName= browser.getText("//div[@id='x3-docList-panel']//span/span[3]");
    }
}

module.exports = sortingObj;