var smdb = require('./../../common/smdb/siteManagementDb');

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
    this.waitForVisible("#grid-favorites");
    return;
};

module.exports.selectCreateTemplatesAndPages = function(){
    this.click("li.pb-topbar-nav-button:nth-child(2)");
    this.click("//li[text()='Create']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
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

module.exports.getSiteStructureNavMapNodeIdAndName = function(){
    this.pause(2000);
    return { id: this.getText("Form label b.ng-binding"),
            displayName: this.getText("span.pb-workcenter-breadcrumb b")};
};

module.exports.getSiteStructureNavMapTabsNames = function(){
    return { nodePropTab: this.getText("div.pb-workcenter.ng-scope div.ng-isolate-scope ul.nav-tabs li:nth-child(1) a"),
            nodeCQTab: this.getText("div.pb-workcenter.ng-scope div.ng-isolate-scope ul.nav-tabs li:nth-child(2) a")};
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
    this.click("i.fa-home");
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
        browser.click("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']");
        if(browser.isExisting("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']/parent::*/parent::*/span[@class='k-icon k-plus']"))
        {
            browser.click("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']/parent::*/parent::*/span[@class='k-icon k-plus']");
        }
        browser.waitForExist("#workcenterListGrid");
        browser.waitForExist("//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"']/parent::*/parent::*/span[@class='k-icon k-minus']");
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
        }
        
        browser.waitForExist("(//SPAN[@class='pb-tree-node'][text()='"+nodePathArray[0]+"'])[2]/parent::*/parent::*/span[@class='k-icon k-minus']");
        nodePathArray.shift();
        return traverseNavMapNode( browser, nodePathArray);
    }
    return;
};
module.exports.traverseNavMapNodeSelectNode = traverseNavMapNodeSelectNode;

module.exports.createScopegNavMapNodeAndPublish = function(browser, parentNodeName, newNodeName, newNodeDisplayName, navMapPathArray, publishTo)
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
    browser.waitForValue('Form label b.ng-binding', 5000); //scopemap load wait

     browser.pause(5000);
    publishMap(browser, publishTo);
};

var publishMap = function publishMap(browser, publishTo)
{
    browser.click("//BUTTON[@id='navSavePublish']");
    if(publishTo === 'live')
    {
        browser.click("(//LI[@role='menuitem'])[2]") //publish to live
    }
    else
    {    
        browser.click("(//LI[@role='menuitem'])[1]") //publish to staging
    }
    
    browser.waitForText("(//DIV[@class='pb-overlay-content ng-scope'])[4]");
    browser.click("//BUTTON[@id='modal-ok']");
};
module.exports.publishMap = publishMap;

module.exports.testVerify = function () {
    console.log('testVerify')
    return "Pass";
};
