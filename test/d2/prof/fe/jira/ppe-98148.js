var helper = require('./../../functions/helper');

describe('Find by Id PPE-98148', function () {

    it('Should find by id exists in left pane', function () {
        
       var exists = helper.isFindByIdExists(browser);
        expect(exists).to.true;
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
    });
});