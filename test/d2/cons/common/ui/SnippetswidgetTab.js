var maxWaitTimeInMs = 50000;

var contentPaneFrameSelector = "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";

var SnippetswidgetObj = {

    SnippetWidgetSelection: function () {
    

      
        var SnippetWidget= browser.isExisting("//span//span//span[contains(.,'Related Content')]");
        if (SnippetWidget == false) 
        {
            browser.click("//div[@id='tab-container-2']/div[1]/div[2]/ul/div[1]//span");

            browser.waitForVisible("//center[2]/div/table/tbody/tr/td//img[@id='Related Content-widgetItem']", maxWaitTimeInMs);
            console.log("test");
            browser.click("//div[@title='Related Content']");
            browser.pause(3000);
          
        }
        browser.click("//span//span//span[contains(.,'Related Content')]");
        browser.pause(5000);
    },





        ValidateRelatedContedheaders: function(){
        
       
        var chronicid= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[2]");
        var ObjectName= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[3]");
        var Title= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[4]");
        var ExternalID= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[5]");
        var PMRDate= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[6]");
        var Modified= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[7]");
        var ModifiedBy= browser.getText("//table[@st-table='displayedCollection']//thead/tr/th[8]");
         expect(chronicid).to.equal("Chronicle ID");
         expect(ObjectName).to.equal("Object Name");
         expect(Title).to.equal("Title");
         expect(ExternalID).to.equal("External ID");
         expect(PMRDate).to.equal("Primary Medical Review Date");
         expect(Modified).to.equal("Modified");
         expect(ModifiedBy).to.equal("Modified By");


    },
    


  SelectSnippetAsset : function () {

       browser.click("//table[@st-table='displayedCollection']//tbody//tr[1]//td[3]//span");
        browser.pause(5000);
    
  },


   SwitchToRelatedWidgetFrame: function () {
        browser.frame();
        var contentWidgetIFrameElement = browser.element(contentPaneFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    },
 

 

  
}

module.exports = SnippetswidgetObj;