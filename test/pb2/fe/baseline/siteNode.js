var LoginPage = require('./../../common/pbLogin');
var common = require('./../../common/commonLib');
var data = require('./../../data/testRunConfig');
var util = require('util');

describe('PB2 Site Node (Scope & Nav Map)', function () {

    describe('Create ScopeMap and Nav Map', function () {

        var scopeMapNodePath = 'Level 0/zzTest/QA and Dev';
        var navMapPath = 'zzTest/QA and Dev';
        var publishToStaging = 'staging';
        var publishToLive = 'live';
        var newScopeMapNodePath = '';

       it('should select Scope Map node QA and Dev', function () {   

            var sourceNodes = scopeMapNodePath.split("/");
            browser.selectCreateTemplatesAndPages();
            browser.traverseScopeMapTreeSelectNode(browser, sourceNodes);
        });
        
        it('should create new scope map node under QA and Dev and Publish to Staging', function () {

            var d = new Date();
            var newNodeName = util.format('IntTest-%s%s%s%s%s%s', d.getUTCMonth(), d.getUTCDate(), d.getUTCFullYear(),
            d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
            var newNodeDisplayName = util.format('IntTest %s %s %s %s %s %s', d.getUTCMonth(), d.getUTCDate(), d.getUTCFullYear(),
            d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());

            var navMapPathArray = navMapPath.split("/");
            browser.createScopegNavMapNodeAndPublish(browser, 'QA and Dev', newNodeName, newNodeDisplayName, navMapPathArray, publishToStaging);

            newScopeMapNodePath = scopeMapNodePath + "/" +newNodeDisplayName;
            var sourceNodes = newScopeMapNodePath.split("/");
            browser.clickHome();
            browser.selectCreateTemplatesAndPages();
            browser.traverseScopeMapTreeSelectNode(browser, sourceNodes);
        });

        it('should Publish new scopemap node to Live', function () {
            
            var sourceNodes = newScopeMapNodePath.split("/");
            browser.clickHome();
            browser.selectCreateTemplatesAndPages();
            browser.traverseScopeMapTreeSelectNode(browser, sourceNodes);
            browser.publishMap(browser, 'live');
        });

        it.skip('should create new scope map node under QA and Dev and Publish to Live', function () {
                        
        });
    });

    before( function(){
        
        browser.addCommand('clickHome', common.clickHome.bind(browser));
        browser.addCommand('publishMap', common.publishMap.bind(browser));
        browser.addCommand('traverseScopeMapTreeSelectNode', common.traverseScopeMapTreeSelectNode.bind(browser));
        browser.addCommand('selectCreateTemplatesAndPages', common.selectCreateTemplatesAndPages.bind(browser));
        browser.addCommand('createScopegNavMapNodeAndPublish', common.createScopegNavMapNodeAndPublish.bind(browser));
        browser.addCommand('login', common.login.bind(browser));
        browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
        browser.setViewportSize({
            width: 1024,
            height: 768
        });
        browser.login(data.testData);
    });
});