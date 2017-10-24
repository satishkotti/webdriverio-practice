var test = require('./../../../../common/functions/functions');
var pageTestData = require('./../../../../data/page.assets');
var templateTestData = require('./../../../../data/template.assets');
var moduleTestData = require('./../../../../data/pagemodule.assets');

function refreshAndContinue(){
    console.log("Refrshing the page");
    browser.refresh();
    browser.pause(5000);
    test.EditTheAsset();
    browser.pause(5000);
}

function createTemplateAndPublish(){
    test.EnterIWC('Create', 'Templates & Pages');
    test.TraverseSS('Level 0/zzTest/QA and Dev')
    var templateData = templateTestData.normalStandaloneTemplateLeftRail;
    var parentTemplateName = templateData.templateName;
    var parentTemplateLayout = templateData.layout;
    var parentTemplateLayoutCSS = templateData.layoutCSS;
    var templateToInheritFrom = parentTemplateName + ' [' + parentTemplateLayout + 'Layout' + ' - ' + parentTemplateLayoutCSS + ']';
    var moduleDetails = moduleTestData.htmlModule.get('HTMLPageModule0');
    templateChronID = test.Create("Template",templateData);
    addModules(0);
    test.SaveOrPublishTheAsset('publish to live', 'Test');
    browser.pause(60000);
    return (templateToInheritFrom);
}

function addModules(index){
    console.log("Adding module on pane"+index);
    test.AddModule('ContentPane'+index,moduleTestData.htmlModule.get('HTMLPageModule'+index));
    browser.waitForVisible("=HTMLPageModule"+index);
    try{
        //Clicks the link with text HTMLPageModule0, HTMLPageModule1,....
        browser.click("=HTMLPageModule"+index);
        console.log("Cofiguring Module on pnae"+index)
        }
    catch(err){
        browser.scroll("=HTMLPageModule"+index);
        browser.click("=HTMLPageModule"+index);
        console.log("Cofiguring Module on pane"+index)
    }
    browser.pause(5000);
    browser.setValue("//label/textarea","HTMLPageModule"+index);
    test.SaveModule();
}

function uiVerification(index){
    var id = "#ContentPane"+index;
    expect(browser.isExisting(id)).equals(true,"ContentPane"+index+" does not exist");
    expect(browser.getText(id)).equals("HTMLPageModule"+index, "Verify the module on ContentPane"+index);
}
//No need to run the test suite as the new css option is not deployed for Boots Site.
describe('PPE-107699: New Template/Page Layout screen', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin(null,'Boots Desktop');
    });
    it('Verify the layout on Inherited page', function() {
        //Create a Template
        var templateName = createTemplateAndPublish();
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zTest/QA and Dev')
        var assetDetails = pageTestData.normalInheritedPageLeftRail.get(templateName);
        var chronId = test.Create("Page",assetDetails);
        var contentPaneSets=[['1','36'], ['46','63'],['99']];
        //var contentPaneSets=[['19','20']];
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
        test.SaveOrPublishTheAsset('publish to live', 'Test');        
        test.NavigatetoATSStatusCheckerPageOf(chronId, 'live');
        browser.pause(30000);
        test.WaitForATSFile();
        var xml = test.GetXML(chronId,'live');
        var panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
        for(i=0;i<panes.length;i++)
        {
            var currentPane = panes[i].$.name;
            var moduleMap = panes[i].module.$;
            expect(moduleMap.path).contains("module_HTMLPageModule"+i);
        }
        browser.url("http://www."+global.testEnv+".webmd.com/zTest/qa-and-dev/"+pageName);
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

    it('Verify the layout on standalone page', function() {
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zTest/QA and Dev')
        var assetDetails = pageTestData.normalStandalonePageLeftRail
        var pageName = assetDetails.pageName;
        var chronId = test.Create("Page",assetDetails);
        //var contentPaneSets=[['19','20']];
        var contentPaneSets=[['0','36'], ['46','63'],['99']];
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
        test.SaveOrPublishTheAsset('publish to live', 'Test');        
        test.NavigatetoATSStatusCheckerPageOf(chronId, 'live');
        browser.pause(30000);
        test.WaitForATSFile();
        var xml = test.GetXML(chronId,'live');
        var panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
        for(i=0;i<panes.length;i++)
        {
            var currentPane = panes[i].$.name;
            var moduleMap = panes[i].module.$;
            expect(moduleMap.path).contains("module_HTMLPageModule"+i);
        }
        browser.url("http://www."+global.testEnv+".webmd.com/zTest/qa-and-dev/"+pageName);
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
