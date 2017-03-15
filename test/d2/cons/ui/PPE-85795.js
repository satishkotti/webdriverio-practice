
var LoginPage = require('./../common/d2login');
var common = require('./../common/d2commonLib');
var interactivearticles = require('./../common/interactivearticlesbulletlist');
var data = require('./../data/d2testRunConfig');
var randomstring = require("randomstring");

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
        browser.addCommand('interactiveModuleBulletMenu', interactivearticles.interactiveModuleBulletMenu.bind(browser));
        browser.addCommand('interactiveModuleBulletAvailability', interactivearticles.interactiveModuleBulletAvailability.bind(browser));
        browser.addCommand('interactiveModuleBulletList', interactivearticles.interactiveModuleBulletList.bind(browser));
        browser.addCommand('interactiveModuleBulletModule', interactivearticles.interactiveModuleBulletModule.bind(browser));
        browser.addCommand('interactiveModuleBulletListEdit', interactivearticles.interactiveModuleBulletListEdit.bind(browser));
        browser.addCommand('interactiveModuleBulletTitleDescription', interactivearticles.interactiveModuleBulletTitleDescription.bind(browser));
        browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
        browser.setViewportSize({
            width: 1920,
            height: 1080
        });
        browser.login(data.testData);
        browser.Navigation(browser, data.inputData.rootnode, data.inputData.rotpath);
    });



    // it('should verify the availability of BulletList Module ', function () {


    //     // browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     //   browser.EditProperties(browser,data.inputData.articletitle,'TestQANewss', 'TestQANewsArtcle', 'News', 'Testuserdesc','TestwebmdKeywords','Testwindowtitle','WebMD Newsletter',data.inputData.webmdcpyrights,'News Page');

    //       browser.CheckoutAndCheckin(browser, data.inputData.objectTitle, 'Check-out');
    //     //   browser.CheckoutAndCheckin(browser,data.inputData.articletitle,'Check-in');

    //     //   browser.LifeCycle(browser,data.inputData.articletitle,'Power Promote');
    //     //  browser.interactiveModuleBulletAvailability (browser,data.inputData.articleContentFields)
    //  //    browser.interactivemodulebullet(browser,data.inputData.objectTitle);

    //    // browser.interactiveModuleBulletMenu(browser,data.inputData.objectTitle);

    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //         var vals = browser.interactiveModuleBulletMenu(browser, x, i);
    //         expect(vals.headline).to.equal(data.expectedResults.headline);
    //         expect(vals.moduleDescription).to.equal(data.expectedResults.moduleDescription);
    //         expect(vals.align).to.equal(data.expectedResults.align);
    //         expect(vals.alignLeftOption).to.equal(data.expectedResults.alignLeftOption);
    //         expect(vals.alignMiddleOption).to.equal(data.expectedResults.alignMiddleOption);
    //         expect(vals.alignRightOption).to.equal(data.expectedResults.alignRightOption);
    //         expect(vals.bullet).to.equal(data.expectedResults.bullet);
    //         expect(vals.bulletTitle).to.equal(data.expectedResults.bulletTitle);
    //         expect(vals.insertBulletTitle).to.equal(data.expectedResults.insertBulletTitle);
    //         expect(vals.insertBulletDescription).to.equal(data.expectedResults.insertBulletDescription);
    //         i++;
    //     });


    // });

    it('should verify editing bullet list field text - PPE-102328', function () {

        browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
        browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
        var richtextFields = data.inputData.articleContentFields;
        var i = 1;
        richtextFields.split(',').forEach(function (x) {
            browser.interactiveModuleBulletMenu(browser, x, i);
            browser.pause(2000);
            i++;
        });

    });


    it('should verify availibilty for the Bullet List module - PPE-102328', function () {

        browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
        browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
        var richtextFields = data.inputData.articleContentFields;
        var i = 1;
        richtextFields.split(',').forEach(function (x) {
            browser.interactiveModuleBulletAvailability(browser, x, i);
            browser.pause(2000);
            i++;
        });

    });

    //  it('should Verify the bullet list options in the module menu - PPE-101666', function () {

    //     browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //         var vals = browser.interactiveModuleBulletMenu(browser, x, i);
    //         expect(vals.headline).to.equal(data.expectedResults.headline);
    //         expect(vals.moduleDescription).to.equal(data.expectedResults.moduleDescription);
    //         expect(vals.align).to.equal(data.expectedResults.align);
    //         expect(vals.alignLeftOption).to.equal(data.expectedResults.alignLeftOption);
    //         expect(vals.alignMiddleOption).to.equal(data.expectedResults.alignMiddleOption);
    //         expect(vals.alignRightOption).to.equal(data.expectedResults.alignRightOption);
    //         expect(vals.bullet).to.equal(data.expectedResults.bullet);
    //         expect(vals.bulletTitle).to.equal(data.expectedResults.bulletTitle);
    //         expect(vals.insertBulletTitle).to.equal(data.expectedResults.insertBulletTitle);
    //         expect(vals.insertBulletDescription).to.equal(data.expectedResults.insertBulletDescription);
    //         i++;
    //     });

    // });


    
    //  it('should verify user is able access bullet list with data in the Rich text editor - PPE-102329', function () {

    //     browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //         var moduleName = browser.interactiveModuleBulletList(browser, x, i);
    //         expect(moduleName.mName).to.equal(data.expectedResults.moduleTitle);
    //         i++;
    //     });

    // });

    //   it('should Verify that user is able to insert multiple list within content - PPE-102331', function () {

    //     browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //         var moduleName = browser.interactiveModuleBulletModule(browser, x, i);
    //         expect(moduleName.mName).to.equal(data.expectedResults.moduleTitle);
    //         i++;
    //     });

    // });

    //  it('should Verify that user is able to edit inserted bullet title and description - new', function () {

    //     browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //         var moduleName = browser.interactiveModuleBulletListEdit(browser, x, i);
    //         expect(moduleName.mName).to.equal(data.expectedResults.moduleTitle);
    //         i++;
    //     });

    // });

    //  it('should Verify user is not able to insert bulletlist module without title and description - PPE-102332', function () {

    //     browser.CreateNewContent(browser, data.inputData.Articleprofilename, data.inputData.ArticledescrName, data.inputData.articleeditdescr, data.inputData.articletitle);
    //     browser.CheckoutAndCheckin(browser, data.inputData.articletitle, 'Check-out');
    //     var richtextFields = data.inputData.articleContentFields;
    //     var i = 1;
    //     richtextFields.split(',').forEach(function (x) {
    //     browser.interactiveModuleBulletTitleDescription(browser, x, i);
    //         i++;
    //     });

    // });

});



