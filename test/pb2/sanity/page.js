var LoginPage = require('./../common/pbLogin');
var common = require('./../common/commonLib');
var data = require('./../data/testRunConfig');

describe('PB2 Page Creation', function () {
    describe('Static Page', function () {
       
       it('should be able to udpate static page', function () {
            
            throw new Error("Add Test");
        });

        it('should be able to expire static page', function () {
            
            throw new Error("Add Test");
        });
    });

    describe('CAP Page', function () {
        it('should be able to create page', function () {
            
            throw new Error("Add Test");
        });
        it('should be able to create page', function () {
            
            throw new Error("Add Test");
        });
        it('should be able to create page', function () {
            
            throw new Error("Add Test");
        });
    });

    before( function(){

browser.addCommand('selectEditTemplatesAndPages', 
                function(){console.log('test page')});

        browser.addCommand('login', common.login.bind(browser));
        browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
        browser.setViewportSize({
            width: 1024,
            height: 768
        });
    });
});