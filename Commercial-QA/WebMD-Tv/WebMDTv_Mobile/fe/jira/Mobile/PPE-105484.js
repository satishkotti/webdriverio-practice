var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var argv = require("yargs").argv;
var PlayerOptions = require('./../../../common/elements/WebMDtv')
var functions = require('./../../../common/functions/Common_functions')
var Input = require('./../../../config/Webmd-tv')[argv.env];

var URL = Input.environment;

describe('Build UGC Module Share Functionality', function () {

    browser.url(URL);
    browser.pause(20000);
    browser.refresh();
    it('verifying share Icon and Image ', function () {
        var count = functions.get_Text(PlayerOptions.UGC_block_Count);
        for (var i = 1; i <= count; i++) {
            browser.swipeLeft(PlayerOptions.UGC_block.selector, 60);
            browser.pause(4000);
            var sharebutton = functions.cssProperties(PlayerOptions.UGC_sharebutton);
            //sharebutton.height.should.containEql('46');
            sharebutton.height.should.containEql('28');
            sharebutton.width.should.containEql('51');
            sharebutton.fontColor.should.equal('#202127');
            sharebutton.fontFamily.should.equal('source sans pro');
            sharebutton.fontSize.should.containEql('14');
            var shareimg = functions.cssProperties(PlayerOptions.UGC_shareimage);
            shareimg.height.should.containEql('15');
            shareimg.width.should.containEql('15');
            shareimg.fontColor.should.equal('#1b88bf');  //Needs to be color as #000000      
        }
    });

    //Verify that clicking of share button in UGC Module shows popup containing facebook and twitter links

    it('Verify that clicking of share button in UGC Module shows popup containing facebook and twitter links ', function () {
        var count = functions.get_Text(PlayerOptions.UGC_block_Count);
        for (var i = 1; i <= count; i++) {
            browser.click(PlayerOptions.UGC_sharebutton.selector);
            if (PlayerOptions.UGC_sharebutton.isExisting()) {
                var facebook = functions.cssProperties(PlayerOptions.UGC_sharefacebook);
                facebook.height.should.containEql('32');
                facebook.height.should.containEql('32');
                var twitter = functions.cssProperties(PlayerOptions.UGC_sharetwitter);
                twitter.height.should.containEql('32');
                twitter.height.should.containEql('32');
                var pintest = functions.cssProperties(PlayerOptions.UGC_sharepintrest);
                pintest.height.should.containEql('32');
                pintest.height.should.containEql('32');
                console.log(i);
                if (PlayerOptions.UGC_shareclose.isExisting()) {
                    browser.click(PlayerOptions.UGC_shareclose.selector);
                }

            }
            else {
                console.log('element is not present');
            }
            browser.swipeLeft(PlayerOptions.UGC_block.selector, 60);
            browser.pause(4000);
        }
    });


    it.only('Verify that clicking of share button in UGC Module shows popup containing facebook and twitter links ', function () {
        var Twitter_Page_Title = 'Twitter';
        var Facebook_Page_Title = 'Facebook';
        var Pintrest_Page_Title = 'Pinterest';
        var count = functions.get_Text(PlayerOptions.UGC_block_Count);
        for (var i = 1; i <= count; i++) {
            browser.click(PlayerOptions.UGC_sharebutton.selector);
            if (PlayerOptions.UGC_sharebutton.isExisting()) {
                var facebook = functions.Socialshare_validations(PlayerOptions.UGC_sharefacebook.selector, PlayerOptions.UGC_sharefacebook.selector);
                facebook.Page_title_Text.should.containEql(Facebook_Page_Title)
                var twitter = functions.Socialshare_validations(PlayerOptions.UGC_sharetwitter.selector, PlayerOptions.UGC_sharetwitter.selector);
                twitter.Page_title_Text.should.containEql(Twitter_Page_Title)
                var pintrest = functions.Socialshare_validations(PlayerOptions.UGC_sharepintrest.selector, PlayerOptions.UGC_sharepintrest.selector);
                pintrest.Page_title_Text.should.containEql(Pintrest_Page_Title);
                console.log(i);
                if (PlayerOptions.UGC_shareclose.isExisting()) {
                    browser.click(PlayerOptions.UGC_shareclose.selector);
                }
            }
            else {
                console.log('element is not present');
            }
            browser.swipeLeft(PlayerOptions.UGC_block.selector, 60);
            browser.pause(4000);
        }
    });

});
