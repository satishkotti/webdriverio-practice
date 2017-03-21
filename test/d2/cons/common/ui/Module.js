var maxWaitTimeInMs = 20000;

var ModuleUIObj = {


    ModuleSelectvalue: function (moduleType) {
        browser.pause(1000);
        browser.click("select[ng-model='moduleConfig.moduleType']");
        browser.click("//option[contains(.,'"+moduleType+"')]");
        browser.pause(1000);

    },
    moduleSearchValue: function (moduleSearch) {
        browser.setValue("input[placeholder='Search by keyword']",moduleSearch);
        browser.click("span[class='input-group-addon']");
        browser.pause(5000);

    },

    moduleSelectSearchResult: function (moduleSearch) {
        browser.click("//div[@class='modal-body']//tr[2]//td[2]");
        browser.pause(5000);
       
    },
    
    selectModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Select')]");
        browser.pause(1000);
    },
    cancelModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Cancel')]");
        browser.pause(1000);
    },
   modulesizelabel: function () {
      var sizelabel = browser.isExisting("//div[@class='row']//div[contains(.,'Size')]");
      return sizelabel; 
   },

   modulesizefield: function () {
      var sizefield = browser.isExisting("//select[@ng-model='module.size']");
      return sizefield; 
   },
     moduleSocialShare: function () {
      var socialshare = browser.isExisting("//input[@id='editmodule-suppressShare']/following-sibling::label[contains(.,'Suppress Social Share')]");
      return socialshare; 
   }

}

module.exports = ModuleUIObj;