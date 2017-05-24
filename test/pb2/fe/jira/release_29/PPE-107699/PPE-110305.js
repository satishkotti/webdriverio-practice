var test = require('./../../../../common/functions/functions');
var pageTestData = require('./../../../../data/page.assets');
var templateTestData = require('./../../../../data/template.assets');
var moduleTestData = require('./../../../../data/pagemodule.assets');

function createTemplateAndPublish(type, templateFrom){
    console.log(type);
    if(type!="inherited")
    {
    test.EnterIWC('Create', 'Templates & Pages');
    test.TraverseSS('Level 0/zzTest/QA and Dev')
    var satemplateData = templateTestData.normalStandaloneTemplateLeftRail;
    var saTemplateName = satemplateData.templateName;
    var saTemplateLayout = satemplateData.layout;
    var saTemplateLayoutCSS = satemplateData.layoutCSS;
    var satemplateToInheritFrom = saTemplateName + ' [' + saTemplateLayout + 'Layout' + ' - ' + saTemplateLayoutCSS + ']';
    var samoduleDetails = moduleTestData.htmlModule.get('HTMLModuleOnContentPane0');
    templateChronID = test.Create("Template",satemplateData);
    addModules(0);
    test.SaveOrPublishTheAsset('publish to live', 'Test');
    browser.pause(60000);
    return (satemplateToInheritFrom);
}
else{
    test.EnterIWC('Create', 'Templates & Pages');
    test.TraverseSS('Level 0/zzTest/QA and Dev')
    var templateData = templateTestData.normalInheritedTemplateLeftRail.get(templateFrom);
    var parentTemplateName = templateData.templateName;
    var parentTemplateLayout = templateData.layout;
    var parentTemplateLayoutCSS = templateData.layoutCSS;
    var templateToInheritFrom = parentTemplateName + ' [' + parentTemplateLayout + 'Layout' + ' - ' + parentTemplateLayoutCSS + ']';
    var moduleDetails = moduleTestData.htmlModule.get('HTMLModuleOnContentPane99');
    templateChronID = test.Create("Template",templateData);
    addModules(99);
    test.SaveOrPublishTheAsset('publish to live', 'Test');
    browser.pause(60000);
    return (templateToInheritFrom);

}
}

function addModules(index){
    console.log("Adding module on pane "+index);
    test.AddModule('ContentPane'+index,moduleTestData.htmlModule.get('HTMLModuleOnContentPane'+index));
    browser.pause(10000);
    console.log("Cofiguring Module on pane "+index)
    browser.scroll("=HTMLModuleOnContentPane"+index);
    browser.click("=HTMLModuleOnContentPane"+index);
    browser.pause(5000);
    browser.waitForVisible('//label[contains(text(),"Module HTML")]');
    if(!(browser.isVisible("//label/textarea"))){browser.waitForVisible("//label/textarea");}
    if(!(browser.isEnabled("textarea.pb-textarea"))){browser.waitForEnabled("textarea.pb-textarea");}
    browser.setValue("textarea.pb-textarea","HTMLModuleOnContentPane"+index);
    test.SaveModule();
    browser.waitForVisible('//button[contains(text(),"Cancel Checkout")]');
    browser.pause(10000);
    
}

function uiVerification(index){
    var id = "#ContentPane"+index;
    expect(browser.isExisting(id)).equals(true,"ContentPane"+index+" does not exist");
    expect(browser.getText(id)).equals("HTMLModuleOnContentPane"+index, "Verify the module on ContentPane"+index);
}

function commonTestSteps(contentPaneSections, chronID){
        
        var contentPaneSets=contentPaneSections;
        var chronId = chronID[0];
        var panesAdded=[];
        for(j = 0; j<contentPaneSets.length;j++){
            var set = contentPaneSets[j];
            if (set.length==2){
                var paneNumber = Math.floor(Math.random() * (parseInt(set[1]) - parseInt(set[0]))) + parseInt(set[0]);
                console.log(paneNumber);
                panesAdded.push(paneNumber);
                addModules(paneNumber);  
                }
            else {
                panesAdded.push(set[0]);
                addModules(set[0]);
            }
        }
        console.log("Saving and publishing");
        test.SaveOrPublishTheAsset('publish to live', 'Test');        
        test.NavigatetoATSStatusCheckerPageOf(chronId, 'live');
        browser.pause(2000);
        test.WaitForATSFile();
        var xml = test.GetXML(chronId,'live');
        var panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
        for(i=0;i<panes.length;i++)
        {
            var currentPane = panes[i].$.name;
            var moduleMap = panes[i].module.$;
            expect(moduleMap.path).contains("module_HTMLModuleOn"+currentPane);
        }
        test.ClickButtonInATSPage("Redirect to URL");
        browser.pause(10000)
        var handles = browser.windowHandles();
        browser.switchTab(handles.value[1]);

        console.log("Verifying the modules on Run time");
        for(pane in panesAdded){
                if((panesAdded[pane]!=0) &&(panesAdded[pane]!=99)){ uiVerification(panesAdded[pane]);}
        }
        console.log("Verified the modules on Run Time");
        browser.close();
        browser.switchTab(handles.value[0]);
        browser.url(global.appUrl);
}

describe('PPE-107699: New Template/Page Layout screen', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });

    it('Verify the layout on page created by inheriting a slandalone tempalte.', function() {
        var parentTemplate = createTemplateAndPublish('standalone', null);
        var assetDetails = pageTestData.normalInheritedPageLeftRail.get(parentTemplate);
        var pageName = assetDetails.pageName;
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        var chronId = test.Create("Page",assetDetails);
        //Specify the upper limit of content pane +1.
        var contentPaneSets=[['1','9'], ['10','18'],['19','27'],['28','36'],['46','54'],['55','63'], ['99']];
        commonTestSteps(contentPaneSets, chronId);
    });

    it('Verify the layout on page created by inheriting a template which inherits another template', function() {
        var parentTemplate = createTemplateAndPublish('standalone', null);
        var childTemplate = createTemplateAndPublish('inherited', parentTemplate);
        var assetDetails = pageTestData.normalInheritedPageLeftRail.get(childTemplate);
        var pageName = assetDetails.pageName;
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        var chronId = test.Create("Page",assetDetails);
        //Specify the upper limit of content pane +1.
        var contentPaneSets=[['1','10'], ['10','19'],['19','28'],['28','37'],['46','55'],['55','64']];
        commonTestSteps(contentPaneSets, chronId);

        });

    it('Verify the layout on standalone page.', function() {
        var assetDetails = pageTestData.normalStandalonePageLeftRail;
        var pageName = assetDetails.pageName;
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        var chronId = test.Create("Page",assetDetails);
        //Specify the upper limit of content pane +1.
        var contentPaneSets=[['0'],['1','9'], ['10','18'],['19','27'],['28','36'],['46','54'],['55','63'], ['99']];
        commonTestSteps(contentPaneSets, chronId);
    });
    /*

    it('close tabs', function(){
        browser.url("http://ats.perf.webmd.com/StatusChecker.aspx?ID=091e9c5e8160174a");
        test.ClickButtonInATSPage("Redirect to URL");
        browser.pause(10000)
        var handles = browser.windowHandles();
        browser.switchTab(handles.value[1]);
        browser.close();
        browser.pause(10000);
        console.log("Closed the tab");
        browser.switchTab(handles.value[0]);
        console.log("on tab 0");
    })
    */
});