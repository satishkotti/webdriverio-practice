var smdb = require('./../../common/siteManagementDb');

var getUrlAndTitle = function(){
    return {
            url: this.getUrl(),
            title: this.getTitle()};
};
module.exports.getUrlAndTitle = getUrlAndTitle;

var login = function (params) {
    console.log('url:' + params.url);
    console.log('username:'+ params.username);
    console.log('password:'  + params.password);
    this.url(params.url);
    this.element('#username').setValue(params.username);
    this.element('#password').setValue(params.password);
    this.element('#pb-login').submitForm();
    this.waitForVisible("#grid-favorites");
    return;
};
module.exports.login = login;

var selectCreateTemplatesAndPages = function(){
    this.click("li.pb-topbar-nav-button:nth-child(2)");
    this.click("//li[text()='Create']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};
module.exports.selectCreateTemplatesAndPages = selectCreateTemplatesAndPages;

module.exports.selectEditTemplatesAndPages = function(){
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};

var getWorkcenterNavMapNodeId = function(){
    return this.getText("div.pb-workcenter-list h3 span");
};
module.exports.getWorkcenterNavMapNodeId = getWorkcenterNavMapNodeId;

var getSiteStructureNavMapNodeIdAndName = function(){
    this.pause(2000);
    return { id: this.getText("Form label b.ng-binding"),
            displayName: this.getText("span.pb-workcenter-breadcrumb b")};
};
module.exports.getSiteStructureNavMapNodeIdAndName = getSiteStructureNavMapNodeIdAndName;

var getSiteStructureNavMapTabsNames = function(){
    return { nodePropTab: this.getText("div.pb-workcenter.ng-scope div.ng-isolate-scope ul.nav-tabs li:nth-child(1) a"),
            nodeCQTab: this.getText("div.pb-workcenter.ng-scope div.ng-isolate-scope ul.nav-tabs li:nth-child(2) a")};
};
module.exports.getSiteStructureNavMapTabsNames = getSiteStructureNavMapTabsNames;

var selectSiteStructureFromEdit = function(){
   
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Site Structure']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node");
    this.waitForExist("Form label b.ng-binding", 20000)
};
module.exports.selectSiteStructureFromEdit = selectSiteStructureFromEdit;

var selectSiteStructureFromInteriorMenu = function(nodeHierarchy){
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 10000);
    this.click("div.pb-workcenter-pane select.pb-workcenter-mode-toggle");
    browser.click("div.pb-workcenter-pane select.pb-workcenter-mode-toggle option:nth-child(2)")
    this.waitForExist("Form label b.ng-binding", 20000)
    
    /*if(nodeHierarchy)
    {
        traverseScopeMapTreeSelectNode(nodeHierarchy)
    }
    else
    {
        this.click("span.pb-tree-node")
        this.waitForExist("div.pb-workcenter-list h3 span", 20000);
    }
    */
    return;
};
module.exports.selectSiteStructureFromInteriorMenu = selectSiteStructureFromInteriorMenu;

module.exports.selectNodeResultGridRowByName = function(name){
    //select level0--> BaseTemplate
    this.waitForText("#workcenterListGrid");
    //console.log("(//TD[@role='gridcell' and text()=' "+name+" '])");
    this.element("(//TD[@role='gridcell' and text()=' "+name+" ']/parent::*)").click();
};

//Feature: favorite
module.exports.setFavorite = function(){
    //favorite menu --> click favorite icon
    this.click("div:nth-child(3) > button[type='button'].button-menu");
        this.click("//LI[@data-ng-click='toggleFavorite()']");
    this.pause(2000);
};

module.exports.getFavoriteByName = function(name){
    return this.getText("//*[@id='favoritesWidget']/table/tbody/tr/td[2]/span[text()='"+name+"']");  
};

module.exports.clickHome = function(){
    this.click("i.fa-home");
    this.waitForExist("#grid-favorites");
};

var selectLevel0Node = function(){
    //selects Level0 node
    this.click("li.pb-topbar-nav-button:nth-child(3)");
};
module.exports.selectLevel0Node = selectLevel0Node;

var traverseScopeMapTreeSelectNode = function(param){
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Create']//li[text()='Site Structure']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};
module.exports.traverseScopeMapTreeSelectNode = traverseScopeMapTreeSelectNode;

var siteManagementGetNodeId = function(id, mapstate){
     return smdb.getSiteVieMapNodeInfo(id, mapstate);
};
module.exports.siteManagementGetNodeId = siteManagementGetNodeId;

var testVerify = function () {
    console.log('testVerify')
    return "Pass";
};
module.exports.testVerify = testVerify;
