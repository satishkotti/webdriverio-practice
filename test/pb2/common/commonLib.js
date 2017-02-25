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

var getWorkcenterNavMapNodeId = function(){
    return this.getText("div.pb-workcenter-list h3 span");
};
module.exports.getWorkcenterNavMapNodeId = getWorkcenterNavMapNodeId;

var selectEditTemplatesAndPages = function(){
    this.click("li.pb-topbar-nav-button:nth-child(3)");
    this.click("//li[text()='Edit']//li[text()='Templates & Pages']");
    this.waitForExist("span.pb-tree-node");
    this.click("span.pb-tree-node")
    this.waitForExist("div.pb-workcenter-list h3 span", 20000);
};
module.exports.selectEditTemplatesAndPages = selectEditTemplatesAndPages;

var testVerify = function () {
    console.log('testVerify')
    return "Pass";
};
module.exports.testVerify = testVerify;
