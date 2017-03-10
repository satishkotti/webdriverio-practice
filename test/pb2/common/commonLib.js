var smdb = require('./../../common/smdb/siteManagementDb');

module.exports.getEnvTestUrl = function()
{
    return global.envSettings.genesys.url;
};

module.exports.getQAPublicationInfo = function()
{
    return global.envSettings.genesys.users[0];
};

module.exports.getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
};

module.exports.login = function (params) {
    /*
        console.log('url:' + params.url);
        console.log('username:'+ params.username);
        console.log('password:'  + params.password);
    */
    this.url(params.url);
    this.element('#username').setValue(params.username);
    this.element('#password').setValue(params.password);
    this.element('#pb-login').submitForm();
    this.waitForVisible("ul.pb-topbar-nav");
    return;
};

module.exports.selectCreateTemplatesAndPages = function(){
    this.waitForVisible("li.pb-topbar-nav-button:nth-child(2)", 10000);
    this.click("li.pb-topbar-nav-button:nth-child(2)");
    this.click("//li[text()='Create']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.moveToObject("div.pb-workcenter-pane");
    //this.click("span.pb-tree-node")
    this.click("//SPAN[@class='pb-tree-node'][text()='Level 0']"); //select default node
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};

module.exports.selectEditTemplatesAndPages = function(){
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};

module.exports.getWorkcenterNavMapNodeId = function(){
    return this.getText("div.pb-workcenter-list h3 span");
};

module.exports.getSiteStructureNavMapNodeIdAndName = function () {
    this.pause(2000);
    return {
        id: this.getText("Form label b.ng-binding"),
        displayName: this.getText("span.pb-workcenter-breadcrumb b")
    };
};

module.exports.getSiteStructureNavMapTabsNames = function () {
    return {
        nodePropTab: this.getText("div.pb-workcenter.ng-scope div.ng-isolate-scope ul.nav-tabs li:nth-child(1) a"),
        nodeCQTab: this.getText("div.pb-workcenter.ng-scope div.ng-isolate-scope ul.nav-tabs li:nth-child(2) a")
    };
};

module.exports.selectSiteStructureFromEdit = function(){
   
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Site Structure']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node");
    this.waitForExist("Form label b.ng-binding", 20000)
};

module.exports.selectSiteStructureFromInteriorMenu = function(){
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 10000);
    this.click("div.pb-workcenter-pane select.pb-workcenter-mode-toggle");
    browser.click("div.pb-workcenter-pane select.pb-workcenter-mode-toggle option:nth-child(2)")
    this.waitForExist("Form label b.ng-binding", 20000)
    return;
};

module.exports.selectNodeResultGridRowByName = function(name){
    //select level0--> BaseTemplate
    this.waitForText("#workcenterListGrid");
    this.element("(//TD[@role='gridcell' and text()=' "+name+" ']/parent::*)").click();
};

//Feature: favorite
module.exports.toggleFavoriteFromWorkcenter = function(){
    //favorite menu --> click favorite icon
    //console.log('toggleFavoriteFromWorkcenter');
    this.click("div:nth-child(3) > button[type='button'].button-menu");
    this.click("//LI[@data-ng-click='toggleFavorite()']");
    this.pause(2000);
};

module.exports.toggleFavoriteForNode = function(){
    //favorite menu --> click favorite icon
    //console.log('toggleFavoriteForNode');
    this.click("//BUTTON[@type='button'][text()='Node Actions']");
    this.click("//LI[@data-ng-click='toggleFavoriteNode()']");
    this.pause(2000);
};

module.exports.isFavoriteSaved = function(name){

    //console.log('isFavoriteSaved');
    this.waitForText("#grid-favorites");
    this.pause(2500);

    //console.log(name);
    return this.isExisting("//SPAN[@ng-bind='dataItem.name'][text()='"+name+"']");  
};

module.exports.clickHome = function(){
    this.waitForVisible("li.pb-topbar-nav-button:nth-child(1)", 10000);
    this.click("li.pb-topbar-nav-button:nth-child(1)");
    this.waitForExist("#grid-favorites");
};

module.exports.selectLevel0Node = function(){
    //selects Level0 node
    this.click("li.pb-topbar-nav-button:nth-child(3)");
};

module.exports.traverseScopeMapTreeSelectNode = function traverseScopeMapNode(browser, nodePathArray)
{
    if(nodePathArray && nodePathArray.length > 0)
    {

console.log(nodePathArray[0]);

        browser.click("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']");
        if(browser.isExisting("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']/parent::*/parent::*/span[@class='k-icon k-plus']"))
        {
            browser.click("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']/parent::*/parent::*/span[@class='k-icon k-plus']");

            browser.waitForExist("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']/parent::*/parent::*/span[@class='k-icon k-minus']", 20000);
        }

        browser.waitForExist("#workcenterListGrid");      
        
        nodePathArray.shift();
        return traverseScopeMapNode( browser, nodePathArray);
    }
    return;
};

var traverseNavMapNodeSelectNode = function traverseNavMapNode(browser, nodePathArray)
{
    if(nodePathArray && nodePathArray.length > 0)
    {
        browser.click("(//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"'])[2]");

        if(browser.isExisting("(//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"'])[2]/parent::*/parent::*/span[@class='k-icon k-plus']"))
        {
            browser.click("(//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"'])[2]/parent::*/parent::*/span[@class='k-icon k-plus']");     

            browser.waitForExist("(//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"'])[2]/parent::*/parent::*/span[@class='k-icon k-minus']");   
        }

        nodePathArray.shift();
        return traverseNavMapNode( browser, nodePathArray);
    }
    return;
};
module.exports.traverseNavMapNodeSelectNode = traverseNavMapNodeSelectNode;

module.exports.createScopeNavMapNodeAndPublish = function(browser, parentNodeName, newNodeName, newNodeDisplayName, navMapPathArray, publishTo)
{
    browser.click("//SPAN[@class='pb-tree-node'][text()='"+parentNodeName+"']");
    browser.waitForExist("#workcenterListGrid");

    browser.click("div.pb-workcenter-pane select.pb-workcenter-mode-toggle option:nth-child(2)");
    browser.waitForExist("Form label b.ng-binding", 20000);
    browser.pause(1000);

    browser.click('div.pb-create-node > button.ng-scope');
    browser.waitForText('.pb-overlay-content .ng-scope');
    browser.pause(1000);

    browser.setValue("//INPUT[@name='name']", newNodeName);
    browser.setValue("//INPUT[@name='displayName']", newNodeDisplayName);
    browser.click("//BUTTON[@data-ng-click='saveNewNode()']");

    browser.waitForText('#navTree', 30000);
    browser.pause(3000);
    traverseNavMapNodeSelectNode(browser, navMapPathArray);

    browser.click("//BUTTON[@data-ng-click='saveParentNode(newParentNode)']");
    
    browser.pause(3000);
    browser.waitForValue('Form label b.ng-binding', 5000); //scopemap load wait

    publishMap(browser, publishTo);
};

var publishMap = function publishMap(browser, publishTo)
{
    browser.waitForExist("button[class~='dropdown-toggle']");
    browser.pause(2000);
    browser.click("//BUTTON[@id='navSavePublish']");
    if(publishTo === 'live')
    {
        browser.click("(//LI[@role='menuitem'])[2]") //publish to live
    }
    else
    {    
        browser.click("(//LI[@role='menuitem'])[1]") //publish to staging
    }

    browser.waitForExist("button[id~='modal-ok']");
    browser.click("//button[@id='modal-ok']");
    browser.waitForText("section[class~=pb-notification-container]", 20000); //wait for publishing

    browser.pause(5000);
    var msg = browser.element("section[class~=pb-notification-container]").getText();
    if(publishTo === 'live')
    {
        expect(msg).to.equal("NavMap published successfully to live.");
        return;
    }
        expect(msg).to.equal("NavMap published successfully to staging.");
};
module.exports.publishMap = publishMap;

module.exports.testVerify = function () {
    console.log('testVerify')
    return "Pass";
};

module.exports.searchCommon = function(id) {
    this.element('input.ng-pristine').setValue(id);
    this.element('button.fa-search').click().waitForExist("button.button-highlight", 2000);
    this.pause(2000);
}

module.exports.checkout = function() {
    this.click("//button[@class='button button-highlight ng-scope']/span[1]/parent::*");
    this.pause(20000);
    //this.click("ul.nav.nav-tabs > li:nth-of-type(2) > a > uib-tab-heading > span:nth-of-type(1)");
    //this.pause(20000);
}

module.exports.cancelCheckout = function() {
    this.click("//button[@class='button button-link ng-scope']");
    this.pause(2000);
    this.click("//button[@class='button-highlight ng-binding']")
    this.pause(20000);
}

module.exports.checkFromHistory = function(index) {
    this.click("//BUTTON[@type='button'][text()='More Actions']");
    this.click("//I[@class='fa fa-history fa-fw']");
    this.pause(2000);
    this.click("//table[@class='k-selectable']/tbody/tr[" + index + "]");
    this.click("//BUTTON[text()='Checkout & Edit']");
    this.pause(20000);
}

module.exports.PublishAsset = function(Stage) {
    this.click("//BUTTON[@type='button'][text()='More Actions']");
    this.click("//li[@class='ng-binding ng-scope'][text()='Publish']");
    this.pause(2000);

    if (Stage == 'Staging') {
        this.click("//span[@class='pb-lifecycle staging']");
    }

    if (Stage == 'Live') {
        this.click("//span[@class='pb-lifecycle active']");
    }

    this.click("//BUTTON[text()='Publish']");
    this.pause(20000);
}

module.exports.EditAndAddModule = function(moduleType, isPage) {
    this.click("//button[@class='button button-highlight ng-scope']/span[1]/parent::*");
    this.pause(10000);
    this.moveToObject("div.pb-layout > section:nth-of-type(1) > div.pb-contentpane > span.pb-contentpane-title")
    this.click("div.pb-layout > section:nth-of-type(1) > div.pb-contentpane > span.pb-contentpane-title > i.fa.fa-plus.add-module");

    if (isPage)
        this.element("div.container-fluid > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input").setValue('testmodule');
    else
        this.element("form > div.container-fluid > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input").setValue('testmodule');

    this.click("div.container-fluid > div:nth-of-type(1) > div:nth-of-type(3) > label.pb-label > div.chosen-container.chosen-container-single > a.chosen-single.chosen-default > div > b");
    this.element("div.chosen-container.chosen-container-single.chosen-with-drop > div.chosen-drop > div.chosen-search > input").setValue(moduleType);
    this.click("ul.chosen-results > li");
    this.click("section.pb-buttonpane.pb-buttonpane-inModule > button.floatright");
    this.pause(15000);
    this.click("#editSavePublish");
    this.click("div.btn-group.dropdown.open > ul.dropdown-menu > li:nth-of-type(3)");
    this.element("#saveComment").setValue("test comment");
    this.click("#modal-ok");
    this.pause(15000);
}