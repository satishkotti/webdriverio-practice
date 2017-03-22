var page = require('./../../../common/page');

var assetLoc = '//div[@class="k-grid-content"]//td[contains(.,"***")]';
var locator = '';

var iwc = Object.create(page, {

    ssRootNode: { get: () => { return browser.element('//span[text()="Level 0"]'); } },
    node: { value: { get: (node) => { browser.waitForExist('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]', 20000); return browser.element('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]'); } } },
    nodeExpand: { value: { get: (node) => { iwc.nodeVisible.get(node); return browser.element('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]//parent::span//preceding-sibling::span[contains(@class,"k-plus")]'); } } },
    nodeCollapse: { value: { get: (node) => { iwc.nodeVisible.get(node); return browser.element('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]//parent::span//preceding-sibling::span[contains(@class,"k-minus")]'); } } },
    nodeVisible: { value: { get: (node) => {  browser.waitForExist('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]', 20000); } } },
    toggle: { get: () => { return browser.element('.pb-workcenter-mode-toggle'); } },
    addToNode: { value:{ get: (assetType) => { locator = '//button[contains(.,"Add to Node")]'; browser.waitForVisible(locator); browser.click(locator).click('//li[contains(.,"Add ' + assetType + '")]'); } } },
    navMapNodeId: { get: () => { return browser.getAttribute('.k-state-selected .pb-tree-node', 'data-nav_node_id'); } },
    isTreeExpanded: { get: () => {return browser.getAttribute('//li[contains(@class,"k-first")]', 'aria-expanded');} },
    collapseIcons: { get: () => { return browser.elements('.k-minus').value; } },
    selectGridAsset: { value: { get: (assetName) => { locator = assetLoc.replace('***', assetName); browser.waitForVisible(locator); browser.scroll(locator); browser.click(locator); } } },
    element:
    {
        value:
        {
            get: (loc) => { locator = loc; browser. waitForExist(locator); browser.waitForVisible(locator); return browser.element(locator);}
        }
    }

});
module.exports = iwc;