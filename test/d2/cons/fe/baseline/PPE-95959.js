
var LoginPage = require('./../../common/d2login');
var common = require('./../../common/d2commonLib');
var interactivearticles = require('./../../common/InteractiveJavaScriptModule');
var data = require('./../../data/d2testRunConfig');
var randomstring = require("randomstring");

describe('Interactive Article - JavaScript Module', function () {

    before(function () {

       
        browser.addCommand('interactiveModuleJavaScript', interactivearticles.interactiveModuleJavaScript.bind(browser));
        browser.addCommand('interactiveModuleJavaScriptAvailability', interactivearticles.interactiveModuleJavaScriptAvailability.bind(browser));
        browser.addCommand('CheckoutAndCheckin', common.CheckoutAndCheckin.bind(browser))
        browser.addCommand('EditProperties', common.EditProperties.bind(browser));
        browser.addCommand('CreateNewContent', common.CreateNewContent.bind(browser));
        browser.addCommand('Navigation', common.Navigation.bind(browser));
        browser.addCommand('login', common.login.bind(browser));
    
        browser.setViewportSize({
            width: 1920,
            height: 1080
        });
        browser.login(data.testData);
        browser.Navigation(browser, data.inputData.rootnode, data.inputData.rotpath);
    });



    it.skip('should verify availibilty for the Bullet List module - PPE-102328', function () {

        browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
        browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
        var richtextFields = data.inputData.articleContentFields;
        var i = 1;
        richtextFields.split(',').forEach(function (x) {
            browser.interactiveModuleJavaScriptAvailability(browser, x, i);
            browser.pause(2000);
            i++;
        });

    });

    it('should verify capable of storing field text -  PPE-102785', function () {

        browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
         browser.EditProperties(browser,data.inputData.articletitle,'TestQANews', 'TestQANewsArtcle', 'News', 'Testuserdesc','TestwebmdKeywords','Testwindowtitle','WebMD Newsletter',data.inputData.webmdcpyrights,'News Page');
        browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
        var richtextFields = data.inputData.articleContentFields;
        var i = 1;
        richtextFields.split(',').forEach(function (x) {
            browser.interactiveModuleJavaScript(browser, x, i);
            browser.pause(2000);
            i++;
        });

    });



});



