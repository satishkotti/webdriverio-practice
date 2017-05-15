var props = require('./../../../common/elements/assetprops.page');
var assert = require('assert');
var test = require('./../../../common/functions/functions');
var pageTestData = require('./../../../data/page.assets');
var moduleTestData = require('./../../../data/pagemodule.assets');
var ats = require('./../../../common/actions/ats.actions');
//var props = require('./../elements/assetprops.page');

function addModules(index){
    console.log("Adding module on pane ",index);
    test.AddModule('ContentPane'+i,moduleTestData.htmlModule.get('HTMLPageModule'+index));
    browser.pause(5000);
    console.log("Clicking pagemodule");
    try{
        //Clicks the link with text HTMLPageModule0, HTMLPageModule1,....
        browser.click("="+"HTMLPageModule"+index);
    }
    catch(err){
        browser.scroll("="+"HTMLPageModule"+index);
        browser.click("="+"HTMLPageModule"+index);
    }
    browser.pause(10000);
    //test.ConfigureModule('html module', moduleTestData.htmlModuleConfiguration.get("HTMLPageModule"+set[0]));
    browser.setValue("//label/textarea","HTMLPageModule"+index);
    test.SaveModule();

}

function uiVerification(index){
    var id = '#'+"ContentPane"+index;
    if(browser.isExisting(id)){
        var htmltext = browser.getText(id);
        if (htmltext == "HTMLPageModule"+index){
            console.log("Test Pass Text", "ContentPane"+index);
        }
        else{
            console.log("Test Fail Text", "ContentPane"+index);
        }
    }
    else{
        console.log("Test Fail Pane", "ContentPane"+index);
    }
}

describe('PPE-107699: New Template/Page Layout screen', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin('Default','Boots Desktop');
    });
    it('Verify the layout on standalone page', function() {
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev')
        var chronId = test.Create("Page",pageTestData.normalStandalonePageLeftRail);
        //var contentPaneSets=[['0','36'], ['46','63'],['99']];
        var contentPaneSets=[['0','18'], ['28','63'],['99']];
        for(j = 0; j<contentPaneSets.length;j++){
            var set = contentPaneSets[j];
            if (set.length==2){
                for(i=parseInt(set[0]);i<=parseInt(set[1]);i++){
                    addModules(i);                    
                }
            }
            else {
                addModules(set[0]);
            }
        }
        test.SaveOrPublishTheAsset('publish to staging', 'Test');        
        test.NavigatetoATSStatusCheckerPageOf(chronId, 'staging');
        browser.pause(20000);
        test.WaitForATSFile();
        var xml = test.GetXML(chronId,'Preview');
        console.log(xml);
        var panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
        console.log(panes);
        for(i=0;i<panes.length;i++)
        {
            console.log(panes[i]);
            var currentPane = panes[i].$.name;
            var moduleMap = panes[i].module.$;
            console.log(currentPane, moduleMap.path);
            //expect(moduleMap.path).contains("module_HTMLPageModule"+i);
        }
        test.ClickButtonInATSPage("Redirect to URL");
        browser.pause(10000);

        //Verfy element exists and content text of the element
        for(j=0;j<contentPaneSets.length;j++){
            set=contentPaneSets[j];
            if(set.length==2){
                for(i=set[0];i<=set[1];i++){
                    uiVerification(i);
                }
            }
            else{
                uiVerification(set[0]);
            }
        }

    });
});