
var LoginPage = require('./../common/d2login');
var common = require('./../common/d2commonLib');
var interactivearticles = require('./../common/interactivearticlesbulletlist');
var data = require('./../data/d2testRunConfig');


describe('Interactive Article - BulletList Module', function () {

    before(function () {

        // browser.addCommand('Publish', common.Publish.bind(browser));
        // browser.addCommand('LifeCycle', common.LifeCycle.bind(browser));
        browser.addCommand('CheckoutAndCheckin', common.CheckoutAndCheckin.bind(browser))
        // browser.addCommand('EditProperties', common.EditProperties.bind(browser));
        browser.addCommand('CreateNewContent', common.CreateNewContent.bind(browser));
        browser.addCommand('Navigation', common.Navigation.bind(browser));
        browser.addCommand('login', common.login.bind(browser));
        browser.addCommand('interactivemodulebullet', interactivearticles.interactivemodulebullet.bind(browser));
        browser.addCommand('interactiveModuleBulletAvailability', interactivearticles.interactiveModuleBulletAvailability.bind(browser));
        browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
        browser.setViewportSize({
            width: 1920,
            height: 1080
        });
        browser.login(data.testData);
        browser.Navigation(browser, data.inputData.rootnode, data.inputData.rotpath);
    });



    it('should verify the availability of BulletList Module ', function () {


        // browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
        //   browser.EditProperties(browser,data.inputData.articletitle,'TestQANewss', 'TestQANewsArtcle', 'News', 'Testuserdesc','TestwebmdKeywords','Testwindowtitle','WebMD Newsletter',data.inputData.webmdcpyrights,'News Page');

        //  browser.CheckoutAndCheckin(browser, data.inputData.objectTitle, 'Check-out');
        //   browser.CheckoutAndCheckin(browser,data.inputData.articletitle,'Check-in');

        //   browser.LifeCycle(browser,data.inputData.articletitle,'Power Promote');
        //  browser.interactiveModuleBulletAvailability (browser,data.inputData.articleContentFields)
         browser.interactivemodulebullet(browser,data.inputData.objectTitle);

      //  browser.interactiveModuleBulletMenu(browser,data.inputData.objectTitle);

        // var richtextFields = data.inputData.articleContentFields;
        // var i = 1;
        // console.log(richtextFields);
        // richtextFields.split(',').forEach(function (x) {
        //     var vals = browser.interactiveModuleBulletMenu(browser, x, i);
        //     expect(vals.headline).to.equal(data.expectedResults.bulletlist);
        //     i++;
        // });


    });


    // it('should verify availibilty for the Bullet List module', function () {

    //     browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //         browser.interactiveModuleBulletAvailability(browser, x, i);
    //         browser.pause(2000);
    //         i++;
    //     });

    // });

});



