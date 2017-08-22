var assert = require('assert');
var moduleData = require('./../../../../data/pagemodule.assets');
var test = require('./../../../../common/functions/functions');
var randomstring = require("randomstring");

var sm1, sm2, dpm1, dpm2;

function createModule(type) {
    if (type === 'sm'){
        var smDetails = moduleData.htmlModule.get('HTMLModuleSM'+randomstring.generate(5));
        smid = test.Create('Shared Module', smDetails);
        test.SaveOrPublishTheAsset('Publish To Live', 'TestPublish');
        return ({'name': smDetails.moduleName, 'id': smid});
    }
    else{
        var dpmDetails = moduleData.htmlDPModule.get('HTMLModuleDPM'+randomstring.generate(5));
        dpmid = test.Create('Dynamic Programmed Module', dpmDetails);
        test.SaveOrPublishTheAsset('Publish To Live', 'TestPublish');
        return ({'name': dpmDetails.moduleName, 'id': dpmid});
    }
}

function checkATSStatus(chronID){
    test.NavigatetoATSStatusCheckerPageOf(chronID, 'live');
    browser.pause(2000);
    test.WaitForATSFile();
}

describe('PPE-106531: Verify the programming users are able to expire the shared modules and dynamic programming modules', function() {
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
        sm1 = createModule('sm');
        sm2 = createModule('sm');
        dpm1 = createModule('dpm');
        test.Logout();
        test.Login('programminguser');
        console.log(sm1, sm2, dpm1);
    });

    it("PPE-126076: Verify programming user is able to expire the shared module", function() {
        test.SearchFor(null, sm1.id, 'global search');
        browser.pause(4000);
        test.SelectMoreActionsMenuItem('Expire');
        checkATSStatus(sm1.id);
    });

    it("PPE-126076: Verify programming user is able to expire the shared module from search results", function() {
        browser.url(global.appUrl);
        test.SearchFor('SM', sm2.name, 'global search');
        browser.pause(4000);
        test.SelectAsset(sm2.name);
        test.SelectMoreActionsMenuItem('Expire');
        checkATSStatus(sm2.id);
    });

    it("PPE-126077: Verify programming user is able to expire the dynamic programmed module", function() {
        browser.url(global.appUrl);
        test.SearchFor(null, dpm1.id, 'global search');
        browser.pause(4000);
        test.SelectMoreActionsMenuItem('Expire');
        checkATSStatus(dpm.id);
    });

    it("PPE-126077: Verify programming user is able to expire the dynamic programmed module from search results", function() {
        browser.url(global.appUrl);
        test.Logout();
        test.Login('superuser1');
        var dpm2 = createModule('dpm');
        test.Logout();
        test.Login('programminguser');
        test.SearchFor('DPM', dpm2.name, 'global search');
        browser.pause(4000);
        test.SelectAsset(dpm2.name);
        test.SelectMoreActionsMenuItem('Expire');
        checkATSStatus(dpm2.id);
    });

});