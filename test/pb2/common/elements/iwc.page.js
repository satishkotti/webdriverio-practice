var page = require('./../../../common/page');

var iwc = Object.create(page, {

    ssRootNode: { get: () => { return browser.element('//span[text()="Level 0"]'); } },
    node: { value: { get: (node) => { browser.waitForExist('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]', 20000); return browser.element('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]'); } } },
    nodeExpand: { value: { get: (node) => { iwc.nodeVisible.get(node); return browser.element('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]//parent::span//preceding-sibling::span[contains(@class,"k-plus")]'); } } },
    nodeCollapse: { value: { get: (node) => { iwc.nodeVisible.get(node); return browser.element('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]//parent::span//preceding-sibling::span[contains(@class,"k-minus")]'); } } },
    nodeVisible: { value: { get: (node) => {  browser.waitForExist('//span[@class= "pb-tree-node" and contains(.,"' + node + '")]', 20000); } } },
    toggle: { get: () => { return browser.element('.pb-workcenter-mode-toggle'); } },
    addToNode: { value:{ get: (assetType) => { browser.click('//button[contains(.,"Add to Node")]').click('//li[contains(.,"Add ' + assetType + '")]'); } } },
    navMapNodeId: { get: () => { return browser.getAttribute('.k-state-selected .pb-tree-node', 'data-nav_node_id')}},
    browser: { get: () => { return browser; } }
});
module.exports = iwc;