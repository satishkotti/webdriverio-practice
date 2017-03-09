var LoginPage = require('./../common/login');
var ArticleCreate = require('./../common/article');

debugger

describe('Professional  D2 Article Creation', function () {
    it('should login into professional  D2 with publicaiton access CMSDEV-2278', function () {

        LoginPage.open();
        browser.windowHandleSize({width:1800,height:1200});
        LoginPage.username.setValue('QAPublication');
        LoginPage.password.setValue('QA-Doc#1');
        LoginPage.login();
        browser.waitForVisible("#menuDownArrow-button");
        ArticleCreate.Navigation();
        ArticleCreate.newArticle();
        //ArticleCreate.editProperties();
        ArticleCreate.CheckoutCheckin();

        // ArticleCreate.promote();
        // ArticleCreate.demote();
        // ArticleCreate.powerpromote();


        expect(LoginPage.title).to.equal('D2');
    });

});