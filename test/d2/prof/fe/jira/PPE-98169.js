var helper = require('./../../functions/helper');
var common = require('./../../common/commonLib');
var randomstring = require("randomstring");
var randomtext = randomstring.generate(5);

describe('News Team - Customization Template PPE-98169', function () {
   

    it('Verify the user is able to create the article or not', function () {
      console.log("QAD2Prof_"+randomtext);
      console.log(browser.elements("//div[contains(@class, 'x-component x-form-label-left') and contains(.//label, 'Name:')]"));
         
       helper.articlecreation(browser,{
            template: "News Article",
            objectTitle: "QAD2Prof_"+randomtext
        });        
        expect(browser.getTitle()).to.equal(global.d2ProfDataSettings.homepageTitle);
    });
 it('Verify the edit properties', function () {
    var isexits= helper.verifyeditproperties(browser,{
            properties:'//div/label[@for="object_name-input"],//div/label[@for="title-input"],//div/label[@for="wbmd_legacy_id"]',
            propertiestext:"Name789:,Title:,Content ID:"
        });

        expect(isexits).to.true;
 });
    before(function () {

        browser.addCommand('login', helper.login.bind(browser));
        browser.addCommand('isFindByIdExists', helper.isFindByIdExists.bind(browser));
        browser.setViewportSize({
            width: 1024,
            height: 768
        });
        browser.login(browser, {
            url: helper.getEnvTestUrl(),
            username: helper.getQAPublicationUserInfo().username,
            password: helper.getQAPublicationUserInfo().password
        });
        helper.traverspath(browser,{
            rootpath: "webmd::2/professional_assets::3/medscape::4/articles::5/article::6"
        });
    });
});