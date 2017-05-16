var util = require('util');
var LoginPage = require('./../../common/pbLogin');
var common = require('./../../common/commonLib');
//var smdb = require('./../../../common/smdb/siteManagementDb');

describe('PB2 Site Node Create ScopeMap and Nav Map', function () {

        var scopeMapNodePath = 'Level 0/zzTest/QA and Dev';
        var navMapPath = 'zzTest/QA and Dev';
        var qaFolderDisplayName = 'QA and Dev';
        var publishToStaging = 'staging';
        var publishToLive = 'live';
        var newScopeMapNodePath = '';
        var newNodeName = '';
        var newNodeDisplayName = '';

       it('should select Scope Map node QA and Dev', function () {   

            var scopeMapNodeArr = scopeMapNodePath.split("/");
            browser.selectCreateTemplatesAndPages();
            browser.traverseScopeMapTreeSelectNode(browser, scopeMapNodeArr);
        });
        
        it('should create new scope map node under QA and Dev and Publish to Staging', function () {

            var d = new Date();
            newNodeName = util.format('IntTest-%s%s%s%s%s%s', (d.getUTCMonth()+1), d.getUTCDate(), d.getUTCFullYear(),
            d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
            newNodeDisplayName = util.format('IntTest %s %s %s %s %s %s', (d.getUTCMonth()+1), d.getUTCDate(), d.getUTCFullYear(),
            d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());

            var navMapPathArray = navMapPath.split("/");
            browser.createScopeNavMapNodeAndPublish(browser, qaFolderDisplayName, newNodeName, newNodeDisplayName, navMapPathArray, publishToStaging);

            newScopeMapNodePath = scopeMapNodePath + "/" +newNodeDisplayName;
        });

        it.skip('is accessible under under QA and Dev scopemap', function () {

            browser.refresh();
            browser.clickHome();
            browser.selectCreateTemplatesAndPages();

console.log('is access'+ newScopeMapNodePath);

            var sourceNodes = newScopeMapNodePath.split("/");
            browser.traverseScopeMapTreeSelectNode(browser, sourceNodes);
        });

/*
        it('Should have db records for new nodes', function (){
            
            return Promise.resolve(smdb.getSitevieMapNodeLayoutByDisplayName(newNodeDisplayName)
                .then(function (resultset) {
                    expect(resultset.length).to.equal(4); // 4 records 2 for report 2 for siteview map node
                    return smdb.getscopeMapNodeLayoutByDisplayName(newNodeDisplayName);
            }).then(function(result){
                expect(result.length).to.equal(3); // 3 records 1 for each lifcycle.
            }).catch(reason => { 
                    //console.log(reason);
                    expect.fail('DB fail', '', reason);
                }));       
*/

        it('should Publish new scopemap node to Live', function () {
            
            var sourceNodes = newScopeMapNodePath.split("/");
            browser.refresh();
            browser.clickHome();
            browser.selectCreateTemplatesAndPages();

            var sourceNodes = newScopeMapNodePath.split("/");
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
        browser.addCommand('createScopeNavMapNodeAndPublish', common.createScopeNavMapNodeAndPublish.bind(browser));
        browser.addCommand('login', common.login.bind(browser));
        browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
        browser.setViewportSize({
            width: 1920,
            height: 1080
        });

        browser.login({
            url: common.getEnvTestUrl(),
            username: common.getQAPublicationInfo().username,
            password: common.getQAPublicationInfo().password
        });
    });