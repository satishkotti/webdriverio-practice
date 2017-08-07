var assert = require('assert');
var test = require('./../../../../common/functions/functions');
var iwc = require('./../../../../common/actions/iwc.actions');
var props = require('./../../../../common/actions/assetprops.actions');
var pageTestData = require('./../../../../data/page.assets');
var act = require('./../../../../common/actions/assetactions.actions');

var supertest = require('supertest-as-promised');
var server = supertest.agent("https://deploy.webmd.net/cli/environment/");

var testEnv = global.testEnv;
if (testEnv === 'qa02')
    testEnv = 'perf';

function checkATSStatus(chronID){
    test.NavigatetoATSStatusCheckerPageOf(chronID, 'live');
    browser.pause(2000);
    test.WaitForATSFile();
}

function handleRuntimeValidation(expected_protocol){
    var handles = browser.windowHandles();
    browser.switchTab(handles.value[1]);
    var actual_protocol = browser.getUrl().split(':')[0];
    expect(actual_protocol === expected_protocol).to.be.true;
    browser.close();
    browser.switchTab(handles.value[0]);
}

describe('PPE-105015: Verify the file naming convention for PB page/template CSS', function() {
    /*
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();
    });
    */

    it("Verify the SSL configuration is set to true by default", function() {
        var assetDetails = pageTestData.normalStandalonePage;
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        iwc.AddToNode("Page"); 
        var sslconfig = act.GetSSLConfig();
        expect(sslconfig).to.be.true;
        assetChronID = props.PopulatePageProps(assetDetails);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        checkATSStatus(assetChronID);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('https');
    });

    it("Verify the SSL configuration for existing pages remain unchanged", function() {
        var chronID = '091e9c5e80051fcc';
        test.SearchFor(null, chronID, 'global search');
        browser.pause(4000);
        test.EditTheAsset();
        act.ToggleAdditionalProperties();
        var sslconfig = act.GetSSLConfig();
        console.log("SSLConfig is ", sslconfig);
        expect(sslconfig).to.be.false;
        browser.pause(4000);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        browser.pause(30000);
        checkATSStatus(chronID);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('http');
    });

    it("Verify user is able to modify the SSL configuration for existing pages", function() {
        var assetDetails = pageTestData.normalStandalonePage;
        test.EnterIWC('Create', 'Templates & Pages');
        test.TraverseSS('Level 0/zzTest/QA and Dev');
        iwc.AddToNode("Page"); 
        act.SetSSLConfig(false);
        expect(sslconfig).to.be.true;
        assetChronID = props.PopulatePageProps(assetDetails);
        test.SaveOrPublishTheAsset('publish to live', 'Test');
        checkATSStatus(assetChronID);
        test.ClickButtonInATSPage("Redirect to URL");
        handleRuntimeValidation('http');
    });


    it.only("Verify ssl in udeploy", function(){
        var data;
        console.log(testEnv)
        let create = new Promise(function (resolve, reject) {
        server
            .get("componentProperties?environment="+testEnv.toUpperCase()+"&application=ConsumerGenesys&component=ConsumerGenesys")
            .set("Content-Type", "application/json")
            .set("Authorization","Basic <Need to add test account>")
            .send()
            .expect(200, function (err, res) {
                if (!err && res.body) {
                    data = res.body;
                    return resolve(res.body);
                }
                else {
                    return reject(
                        {
                            error: err,
                            response: res.body
                        });
                }
            })
      });

    browser.waitUntil(function() {
        return data === undefined ? false :true;
    }, 60000, "Getting response", 500)
    for(i = 0; i<data.length; i++){
        ele = data[i];
        if(ele.name === 'SSL_REQD_DEFAULT'){
            console.log(ele);
            expect(ele.value === '1').to.be.true;
        }
        else{
            //console.log("Searching for SSL Config property");
        }
    }
});



});