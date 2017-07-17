var assert = require('assert');
var test = require('./../../../../common/functions/functions');
var pageTestData = require('./../../../../data/page.assets');
var templateTestData = require('./../../../../data/template.assets');
var moduleTestData = require('./../../../../data/pagemodule.assets');
var act = require('./../../../../common/actions/assetactions.actions');

var testEnv = global.testEnv;
if (testEnv === 'qa02')
    testEnv = 'perf';

var assets = {};

var cssSCSname = '';
var cssATSname = '';

var cssContent = " body {background-color: yellow;}"
var modifiedcssContent = " body  {background-color: red;}"

var pagecssreference = '<link rel="stylesheet" href="http://css.' + testEnv + '.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Page/';
var templatecssreference = '<link rel="stylesheet" href="http://css.' + testEnv + '.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Template/';

function addModule(index){
    test.AddModule('ContentPane'+index,moduleTestData.htmlModule.get('HTMLModuleOnContentPane'+index));
    browser.pause(10000);
    browser.scroll("=HTMLModuleOnContentPane"+index);
    browser.click("=HTMLModuleOnContentPane"+index);
    browser.pause(5000);
    browser.waitForVisible('//label[contains(text(),"Module HTML")]');
    if(!(browser.isVisible("//label/textarea"))){browser.waitForVisible("//label/textarea");}
    if(!(browser.isEnabled("textarea.pb-textarea"))){browser.waitForEnabled("textarea.pb-textarea");}
    browser.setValue("textarea.pb-textarea","HTMLModuleOnContentPane"+index);
    browser.pause(5000);
    test.SaveModuleConfig();
    browser.waitForVisible('//button[contains(text(),"Cancel Checkout")]');
    browser.pause(15000);
}

function createAssets(){

        //Creating a standalone page
        var assetDetails = pageTestData.normalStandalonePage;
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        var chronID = test.Create("Page",assetDetails);
        addModule(1);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        assets.standalonepage = [chronID];

        //Creating a standalone Templates
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev')
        var satemplateData = templateTestData.normalStandaloneTemplate;
        var saTemplateName = satemplateData.templateName;
        var saTemplateLayout = satemplateData.layout;
        var saTemplateLayoutCSS = satemplateData.layoutCSS;
        var satemplateToInheritFrom = saTemplateName + ' [' + saTemplateLayout + 'Layout' + ' - ' + saTemplateLayoutCSS + ']';
        var samoduleDetails = moduleTestData.htmlModule.get('HTMLModuleOnContentPane0');
        chronID = test.Create("Template",satemplateData);
        addModule(1);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        assets.standaloneTemplate = [chronID];

        //Creating an Page from template
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev')
        assetDetails = pageTestData.normalInheritedPage.get(satemplateToInheritFrom);
        chronID = test.Create("Page",assetDetails);
        //addModule(2);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        if(chronID.constructor === Array){
            assets.inheritedpage = chronID;
        }
        else{
            assets.inheritedpage = [chronID];
        }
}

function checkATSStatus(chronID){
    test.NavigatetoATSStatusCheckerPageOf(chronID, 'live');
    browser.pause(2000);
    test.WaitForATSFile();
}

function setcssNames(){
    cssSCSname = browser.element("//*[@id='lblSCSFile']").getText();
    cssSCSname = cssSCSname.split('\\');
    cssSCSname = cssSCSname[cssSCSname.length - 1];
    cssATSname = browser.element("//*[@id='lblATSFile']").getText();
    cssATSname = cssATSname.split('\\');
    cssATSname = cssATSname[cssATSname.length - 1];
    console.log("CSS SCS Name", cssSCSname);
    console.log("CSS ATS Name", cssATSname);
}

function handleRuntimeValidation(type){
    var handles = browser.windowHandles();
    browser.switchTab(handles.value[1]);
    var pagesource = browser.getSource();
    if(type === 'page'){
        expect(pagesource.includes(pagecssreference + cssATSname)).to.be.true;
    }
    else{
        expect(pagesource.includes(templatecssreference + cssATSname)).to.be.true;
    }
    browser.close();
    browser.switchTab(handles.value[0]);
    browser.url(global.appUrl);
}

function searchAndEditAsset(chronID){
    test.SearchFor(null, chronID, 'global search');
    browser.pause(4000);
    test.EditTheAsset();
    browser.pause(4000);
}

describe('PPE-105015: Verify the file naming convention for PB page/template CSS', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
        createAssets();
        browser.pause(10000);
    });

    it("Verify the name of css added on a page", function() {

        //Validation to Add CSS on Page
        searchAndEditAsset(assets.standalonepage[0]);
        var csschronID = test.AddCSSOnAsset(cssContent, 'page');
        assets.standalonepage.push(csschronID);
        browser.pause(2000);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        browser.pause(60000);
        checkATSStatus(assets.standalonepage[0]);
        checkATSStatus(csschronID);
        console.log("Assets are ", assets);
        setcssNames();
        expect(cssSCSname.includes(assets.standalonepage[0]+'.css')).to.be.true;
        expect(cssATSname.includes(assets.standalonepage[0])).to.be.true;

        //Validation to CSS in Runtime
        browser.pause(200000);
        checkATSStatus(assets.standalonepage[0]);
        checkATSStatus(csschronID);
        setcssNames();
        checkATSStatus(assets.standalonepage[0]);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('page');
    });

    it("Verify the name of css added on a template", function() {

        //Validation to Add CSS on template
        searchAndEditAsset(assets.standaloneTemplate[0]);
        var csschronID = test.AddCSSOnAsset(cssContent, 'template');
        assets.standaloneTemplate.push(csschronID);
        browser.pause(5000);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        checkATSStatus(csschronID);
        checkATSStatus(assets.standaloneTemplate[0]);
        checkATSStatus(csschronID);
        console.log("Assets are" ,assets);
        setcssNames();
        expect(cssSCSname.includes(assets.standaloneTemplate[0]+'.css')).to.be.true;
        expect(cssATSname.includes(assets.standaloneTemplate[0])).to.be.true;

        //Runtime Validation
        browser.pause(200000);
        checkATSStatus(assets.inheritedpage[0]);
        checkATSStatus(csschronID);
        setcssNames();
        checkATSStatus(assets.inheritedpage[0]);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('template');
    });


    it("Verify user is able to edit css added on a page", function() {

        //Validation to Edit CSS on a page
        searchAndEditAsset(assets.standalonepage[0])
        var csschronID = test.ModifyCSSOnAsset(modifiedcssContent, 'page');
        assets.standalonepage.push(csschronID);
        console.log("Assets are ", assets);
        browser.pause(2000);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        browser.pause(60000);

        checkATSStatus(assets.standalonepage[0]);
        checkATSStatus(csschronID);
        setcssNames();
        expect(cssSCSname.includes(assets.standalonepage[0]+'.css')).to.be.true;
        expect(cssATSname.includes(assets.standalonepage[0])).to.be.true;

        //Runtime Validaiton
        browser.pause(400000);
        checkATSStatus(assets.standalonepage[0]);
        checkATSStatus(csschronID);
        setcssNames();
        checkATSStatus(assets.standalonepage[0]);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('page');

    });

    it("Verify user is able to edit css added on a template", function() {

        //Validation to Edit CSS on template
        searchAndEditAsset(assets.standaloneTemplate[0]);
        var csschronID = test.ModifyCSSOnAsset(modifiedcssContent, 'template');
        assets.standaloneTemplate.push(csschronID);
        console.log("Assets are ", assets);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        browser.pause(60000);
        checkATSStatus(assets.standaloneTemplate[0]);
        checkATSStatus(csschronID);
        setcssNames();
        expect(cssSCSname.includes(assets.standaloneTemplate[0]+'.css')).to.be.true;
        expect(cssATSname.includes(assets.standaloneTemplate[0])).to.be.true;

        //Runtime Validation
        browser.pause(400000);
        checkATSStatus(assets.inheritedpage[0]);
        checkATSStatus(csschronID);
        setcssNames();
        checkATSStatus(assets.inheritedpage[0]);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('template');
    });

    it("Verify User is able to modify the existing css on page with old format", function() {
        var pageChronicID = "091e9c5e80032c42";

        searchAndEditAsset(pageChronicID);
        act.ToggleAdditionalProperties();
        browser.pause(4000);

        var cssChronicID =  browser.element("//form[@label= 'Page CSS']/label/a").getText()
        act.ToggleAdditionalProperties();
        browser.pause(4000);
        var cssChronicIDpost = test.ModifyCSSOnAsset(modifiedcssContent, 'page');
        browser.pause(2000);
        expect(cssChronicID === cssChronicIDpost).to.be.true;

        test.SaveOrPublishTheAsset('publish to live', 'Test');
        browser.pause(60000);
        checkATSStatus(pageChronicID);
        checkATSStatus(cssChronicID);
        setcssNames();
        expect(cssSCSname.includes(cssChronicID+'.css')).to.be.true;
        expect(cssATSname.includes(cssChronicID)).to.be.true;

        browser.pause(200000);
        checkATSStatus(pageChronicID);
        checkATSStatus(cssChronicID);
        setcssNames();
        checkATSStatus(pageChronicID);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('page');
    });

    it("Verify User is able to modify the existing css on template with old format", function() {
        var templateChronicID = "091e9c5e8012bc38";
        searchAndEditAsset(templateChronicID);

        var cssChronicID =  browser.element("//form[@label= 'Template CSS']/label/a").getText()
        browser.pause(4000);
        var cssChronicIDpost = test.ModifyCSSOnAsset(modifiedcssContent, 'template');
        browser.pause(2000);
        expect(cssChronicID === cssChronicIDpost).to.be.true;

        test.SaveOrPublishTheAsset('publish to live', 'Test');
        browser.pause(60000);
        checkATSStatus(templateChronicID);
        checkATSStatus(cssChronicID);
        setcssNames();
        expect(cssSCSname.includes(cssChronicID+'.css')).to.be.true;
        expect(cssATSname.includes(cssChronicID)).to.be.true;

    });

});