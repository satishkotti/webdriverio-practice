
var LoginPage = require('./../common/login');
var Features = require('./../common/features');
var data = require('./../data/testRunConfig');
var randomstring = require("randomstring");
var randomtext = randomstring.generate(5);


before(function () {

    LoginPage.open();
    browser.windowHandleMaximize();
    LoginPage.username.setValue(data.testData.username);
    LoginPage.password.setValue(data.testData.password);
    LoginPage.login();
    expect(LoginPage.title).to.equal('D2');

    //  Features.Navigation();
});

describe('Consumer D2 Interactive Module - Bullet List', function () {
    it('Base functions', function () {
         Features.Navigation();
    //   var objectTitle = 'QATestAsset_' + randomtext;
    var objectTitle = "QANewsArticle";
    //     Features.newArticle("News Template", objectTitle);
    //     Features.editProperties(objectTitle, "Medical Reference", "WebMD Medical News");
    //    // Features.CheckoutCheckin(objectTitle);
    //     Features.Checkout(objectTitle);
    //     Features.Checkin(objectTitle);
    //     Features.promote(objectTitle);
    //     Features.demote(objectTitle);
    //     Features.powerpromote(objectTitle);
    //     Features.publish(objectTitle, "Active");
        Features.interactivemodulebullet(objectTitle);


    });




 });

// describe('Consumer D2 Interactive Module - Bullet List', function () {
//     it('Availability for bulletList', function () {
//         Features.Navigation();
//         //     var objectTitle = 'QATestAsset_' + randomtext;
//         var objectTitle = "QANewsArticle";
//         //     Features.newArticle("News Template", objectTitle);

//         Features.Checkout(objectTitle);
//         var CKEditorFields = data.testData.articleContentFields;
//         var i = 1;
//         CKEditorFields.split(',').forEach(function (x) {

//             Features.interactivemoduleBulletListAvailability(objectTitle, x, i);
//             browser.pause(2000);
//             i++;
//         });


//     });




// });

