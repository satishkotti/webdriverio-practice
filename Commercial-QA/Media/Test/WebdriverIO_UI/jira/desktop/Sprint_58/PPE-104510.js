var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path')
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-104510.testdata')[argv.env];
var url = input.environment;

describe('PPE-104510', function ()
 {
    console.log(url);
    browser.url(url);
    browser.waitForVisible("//div[@id='webmdHoverClose']",1000);
    browser.click("//div[@id='webmdHoverClose']");
    //browser.pause(3000);
    
    function _fn(i)
    {
        it('Advertisement label should be displayed above the ad', function ()
        {   
            browser.pause(1000);
            browser.scroll('#ContentPane30 article div.article-body div.article-page.active-page .teads-inread');
            browser.pause(3000);
            var videoHeading = browser.isVisible("#ContentPane30 article div.article-body div.article-page.active-page div.teads-inread.sm-screen div div.teads-ui-components-label")
            console.log("*********************");
            console.log(videoHeading);
            console.log("Test case 1: ");
            videoHeading.should.be.equal(true);
        });

        it('Verify that the ad begins to auto-play when it is 50% in view', function ()
        {
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            console.log("*********************");
            console.log(my_frame1);
            console.log(my_frame1.value);
            browser.frame(my_frame1.value);
            var progressVisible = browser.isVisible('#layout-video-component div.teads-ui-component-progressbar.show div');
            console.log("progressVisible: "+progressVisible);
            console.log("Test case 2: ");
            progressVisible.should.be.equal(true);
        });

        it('Verify that the player width aligns with the margins of the center content well', function ()
        {
            var elem0 = $('#layout-video-component');
            var widthDisplay0 = elem0.getCssProperty('width');
            console.log("*********************");
            console.log("widthDisplay: "+widthDisplay0.value);
            console.log("Test case 3: ");
            (widthDisplay0.value).should.be.equal("516px");
        });

        it('Verify that video ad can be un-muted', function ()
        {
            var my_frame2 = $('div#main-container #layout-video-component #vpaid-container iframe');
            console.log("*********************");
            console.log(my_frame2);
            console.log(my_frame2.value);
            browser.frame(my_frame2.value);

            browser.rightClick('div#vpaid-container .vpaid-clickthrough', 180, 180);
            browser.pause(1000);
                
            browser.frameParent();
            browser.frameParent();
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            browser.pause(1000);
            var unmute = browser.elements("div#main-container #layout-video-component .teads-ui-component-soundbutton.show .equalizer");
            //console.log("*********************");
            console.log("Test case 4: ");
            console.log('unmute value', unmute);
            console.log('unmute value', unmute.value);
            console.log('unmute selector', unmute.selector);
        }); 

        it('Verify that video ad can be muted', function ()
        {
            browser.pause(2000);
            browser.frameParent();
            browser.frameParent();
            var link = browser.elements('#ContentPane30 article div.article-body div.article-page.active-page ul li a');
            if(link === true)
            {
                browser.rightClick('#ContentPane30 article div.article-body div.article-page.active-page ul li a', 45, 45);
            }
            else
            {
                browser.rightClick('#ContentPane30 article div.article-body div.article-page.active-page p a', 45, 45);
            }
            //browser.scroll('#ContentPane30 article ul.pagination');
            browser.pause(1000);
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var mute = browser.elements("div#main-container #layout-video-component .teads-ui-component-soundbutton.muted.show .equalizer");
            console.log("*********************");
            console.log("Test case 5: ");
            console.log('mute value', mute);
            console.log('mute value', mute.value);
            console.log('mute selector', mute.selector);
            var elem1 = $('div#main-container #layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay1 = elem1.getCssProperty('width');
            //console.log("*********************");
            console.log("Progress bar width display: "+widthDisplay1.value);
        });

        it('Verify video ad should pause when you scroll the ad out of view & Verify video ad auto-resume from the point where you scrolled out of view', function ()
        {
            browser.frameParent();
            browser.frameParent();
            browser.scroll('#ContentPane30 article ul.pagination');
            browser.pause(2000);
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var mute = browser.elements("div#main-container #layout-video-component .teads-ui-component-soundbutton.muted.show .equalizer");
            console.log("*********************");
            console.log("Test case 6 & 7: ");
            console.log('mute value', mute);
            console.log('mute value', mute.value);
            console.log('mute selector', mute.selector);

            var elem2 = $('#layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay2 = elem2.getCssProperty('width');
            //console.log("*********************");
            console.log("Progress bar width display: "+widthDisplay2.value);

            browser.pause(1000);
            var elem3 = $('#layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay3 = elem3.getCssProperty('width');
            //console.log("*********************");
            console.log("Progress bar width display: "+widthDisplay3.value);
            (widthDisplay2.value).should.be.equal(widthDisplay3.value);

            browser.frameParent();
            browser.frameParent();
            browser.scroll('#ContentPane30 article div.article-body div.article-page.active-page .teads-inread');

            browser.pause(1000);
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var elem4 = $('#layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay4 = elem4.getCssProperty('width');
            //console.log("*********************");
            console.log("Progress bar width display: "+widthDisplay4.value);
            (widthDisplay4.value).should.be.above(widthDisplay3.value);
        });

        it('Verify that the ad video remains expanded the entire time', function ()
        {
            var endscreenVisible = browser.waitForVisible('#layout-video-component div.teads-ui-component-endscreen.show',25000);
            console.log("*********************");
            console.log(endscreenVisible);
            endscreenVisible.should.be.equal(true);
            var my_frame2 = $('div#main-container #layout-video-component #vpaid-container iframe');
            browser.frame(my_frame2.value);
            var videoVisible = browser.isVisible("#vpaid-container video");
            console.log(videoVisible);
            console.log("Test case 8: ");
            videoVisible.should.be.equal(true);
        });

        it('Verify that "Replay" button should be displayed after the video completes playing', function ()
        {
            browser.frameParent();
            browser.frameParent();
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var replayVisible = browser.isVisible('#layout-video-component div.teads-ui-component-endscreen.show div.button-container div.button.replay-button');
            console.log("*********************");
            console.log(replayVisible);
            console.log("Test case 9: ");
            replayVisible.should.be.equal(true);
            browser.pause(3000);
        });

        it('Verify that on tapping close(x) in the top-right corner of the video ad should collapse the ad', function ()
        {
            browser.frameParent();
            browser.frameParent();
            browser.scroll('//*[@id="ContentPane30"]/article/div[2]/div[@class="article-page active-page"]/div[@class="teads-inread sm-screen"]/preceding::p[1]');
            browser.pause(2000);
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var closebuttonVisible = browser.isVisible('div#main-container #layout-video-component div.teads-ui-component-endscreen.show div.close-button');
            console.log("*********************");
            console.log(closebuttonVisible);
            closebuttonVisible.should.be.equal(true);
            
            browser.click('div#main-container #layout-video-component div.teads-ui-component-endscreen.show .close-button');
            var my_frame2 = $('div#main-container #layout-video-component #vpaid-container iframe');
            browser.frame(my_frame2.value);

            browser.pause(1000);
            var videoInvisible = browser.isVisible("#vpaid-container video");
            console.log(videoInvisible);
            console.log("Test case 10: ");
            videoInvisible.should.be.equal(false);
            console.log("before");
            browser.pause(3000);
            browser.frameParent();
            browser.frameParent();
            browser.scroll('//*[@id="ContentPane30"]/article/div[2]/div[1]/div[@class="bottom-ad-override"]/preceding::p[1]');
            //browser.scroll('//*[@id="ContentPane30"]/article/div[2]/div[@class="article-page active-page"]/footer/preceding::p[1]');
            console.log("middle");
            browser.pause(2000);
            var nextpage = browser.elements('#ContentPane30 article ul span li.next a');
            if(true)
            {
                browser.click('#ContentPane30 article ul span li.next a');
                browser.pause(7000);
                console.log("after");
            }
            else
            {
                browser.close();
            }
        });
    }
    /*browser.scroll('#ContentPane30 article ul.pagination');
    browser.pause(2000);
    var pageCount = browser.elements('//*[@id="ContentPane30"]/article/ul/li[contains(@class,"page")]').value.length;
    console.log("Page count: "+pageCount);*/
    //}
    for (var i = 0; i < 2; i++)
    {
        _fn(i);
    }
});

