var maxWaitTimeInMs = 100000;
var dqlEditorTabUI = require('./../ui/dqlEditorTab');
var chronicid;
var ObjectName;
var Title;
var ExternalID;
var PMRDate;
var Modified;
var ModifiedBy;


var RelatedFrameSelector = "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";


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

       Verifyrelatedassetdata: function (query) {
        dqlEditorTabUI.switchToExternalWidgetFrame();
        dqlEditorTabUI.dqlEditorQuery(query);
        dqlEditorTabUI.dqlEditorRun();
        browser.waitForVisible("//table[@id='dql']//tr[2]/td[2]",maxWaitTimeInMs);
        var dql_chronicidid= browser.getText("//table[@id='dql']//tr[2]/td[2]");
          console.log(dql_chronicidid);
        var dql_ObjectName= browser.getText("//table[@id='dql']//tr[2]/td[3]");
          console.log(dql_ObjectName);
        var dql_Title= browser.getText("//table[@id='dql']//tr[2]/td[4]");
        var dql_ExternalID= browser.getText("//table[@id='dql']//tr[2]/td[5]");
        var dql_PMRDate= browser.getText("//table[@id='dql']//tr[2]/td[6]");
        var dql_Modified= browser.getText("//table[@id='dql']//tr[2]/td[7]");
        var dql_ModifiedBy= browser.getText("//table[@id='dql']//tr[2]/td[8]");
        browser.pause(5000);
      
        
        console.log(chronicid);
         expect(chronicid).to.equal(dql_chronicidid);
         expect(ObjectName).to.equal(dql_ObjectName);
         expect(Title).to.equal(dql_Title);
         expect(ExternalID).to.equal(dql_ExternalID);
         expect(PMRDate).to.equal(dql_PMRDate);
         expect(Modified).to.equal(dql_Modified);
         expect(ModifiedBy).to.equal(dql_ModifiedBy); 

         

        
        
        

    },

    


  SelectSnippetAsset : function () {
        
        chronicid= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[2]");
        ObjectName= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[3]//span");
        Title= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[4]");
        ExternalID= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[5]");
        PMRDate= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[6]");
        Modified= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[7]");
        ModifiedBy= browser.getText("//table[@st-table='displayedCollection']//tbody//tr[1]//td[8]");
        browser.pause(1000);
        browser.click("//table[@st-table='displayedCollection']//tbody//tr[1]//td[3]//span");
        browser.pause(5000);
    
  },


   SwitchToRelatedWidgetFrame: function () {
        browser.frame();
        var contentWidgetIFrameElement = browser.element(RelatedFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    },
 

 

  
}

module.exports = SnippetswidgetObj;