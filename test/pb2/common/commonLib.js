var smdb = require('./../../common/siteManagementDb');

module.exports.getUrlAndTitle = function () {
    return {
        url: this.getUrl(),
        title: this.getTitle()
    };
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

module.exports.selectCreateTemplatesAndPages = function () {
    this.click("li.pb-topbar-nav-button:nth-child(2)");
    this.click("//li[text()='Create']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};

module.exports.selectEditTemplatesAndPages = function () {
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};

module.exports.getWorkcenterNavMapNodeId = function () {
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

module.exports.selectSiteStructureFromEdit = function () {

    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Site Structure']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node");
    this.waitForExist("Form label b.ng-binding", 20000)
};

module.exports.selectSiteStructureFromInteriorMenu = function (nodeHierarchy) {
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

module.exports.selectNodeResultGridRowByName = function (name) {
    //select level0--> BaseTemplate
    this.waitForText("#workcenterListGrid");
    this.element("(//TD[@role='gridcell' and text()=' " + name + " ']/parent::*)").click();
};

//Feature: favorite
module.exports.toggleFavoriteFromWorkcenter = function () {
    //favorite menu --> click favorite icon
    //console.log('toggleFavoriteFromWorkcenter');
    this.click("div:nth-child(3) > button[type='button'].button-menu");
    this.click("//LI[@data-ng-click='toggleFavorite()']");
    this.pause(2000);
};

module.exports.toggleFavoriteForNode = function () {
    //favorite menu --> click favorite icon
    //console.log('toggleFavoriteForNode');
    this.click("//BUTTON[@type='button'][text()='Node Actions']");
    this.click("//LI[@data-ng-click='toggleFavoriteNode()']");
    this.pause(2000);
};

module.exports.isFavoriteSaved = function (name) {

    //console.log('isFavoriteSaved');
    this.waitForText("#grid-favorites");
    this.pause(2500);

    //console.log(name);
    return this.isExisting("//SPAN[@ng-bind='dataItem.name'][text()='" + name + "']");
};

module.exports.clickHome = function () {
    this.click("i.fa-home");
    this.waitForExist("#grid-favorites");
};

module.exports.selectLevel0Node = function () {
    //selects Level0 node
    this.click("li.pb-topbar-nav-button:nth-child(3)");
};

module.exports.traverseScopeMapTreeSelectNode = function (param) {
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Create']//li[text()='Site Structure']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};

module.exports.siteManagementGetNodeId = function (id, mapstate) {
    return smdb.getSiteVieMapNodeInfo(id, mapstate);
};

module.exports.testVerify = function () {
    console.log('testVerify')
    return "Pass";
};

module.exports.searchCommon = function (id) {
    this.element('input.ng-pristine').setValue(id);    
    this.element('button.fa-search').click().waitForExist("button.button-highlight", 2000);    
    this.pause(2000);
}

module.exports.checkout = function () {        
    this.click("//button[@class='button button-highlight ng-scope']/span[1]/parent::*");
    this.pause(20000);
}

module.exports.cancelCheckout = function () {        
    this.click("//button[@class='button button-link ng-scope']");
    this.pause(2000);
    this.click("//button[@class='button-highlight ng-binding']")
    this.pause(20000);
}