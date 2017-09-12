var path = require('path')
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-104509.testdata')[argv.env];
var url = input.environment;

describe('PPE-104509', function ()
 {
    console.log(url);
    browser.url(url);
    browser.waitForVisible("//div[@id='webmdHoverClose']",1000);
    browser.click("//div[@id='webmdHoverClose']");
    
    function _fn(i)
    {
        it('PPE-106793 Mobile: Advertisement label should be displayed above the ad', function ()
        {   
            browser.pause(1000);
            browser.scroll("#ContentPane30 article div.article-body div[data-page='"+(i+1)+"'] div.teads-inread");
            browser.pause(3000);
            var videoHeading = browser.isVisible("//div[@id='teads"+i+"']/preceding-sibling::div[@class='teads-ui-components-label']");
            console.log("********* Test case 1 - Advertisement label should be displayed above the ad************");
            videoHeading.should.be.equal(true);
        });

        it('PPE-107491 Mobile - Verify that the ad begins to auto-play when it is 50% in view', function ()
        {
            browser.frameParent();
            browser.frameParent();
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var progressVisible = browser.isVisible('#layout-video-component div.teads-ui-component-progressbar.show div');
            //console.log("progressVisible: "+progressVisible);
            console.log("********* Test case 2 - Verify that the ad begins to auto-play when it is 50% in view************");
            progressVisible.should.be.equal(true);
            browser.pause(2000);
        });

        it('PPE-106791 Mobile - Verify that video ad should be able to mute', function ()
        {
            var unmute = browser.elements("#layout-video-component div.teads-ui-component-soundbutton.muted.show div.icon-muteon");
            //console.log('unmute content: ', unmute);
            console.log("********* Test case 3 - Verify that video ad can be muted************");
            //console.log('unmute value: ', unmute.value);
            //console.log('unmute selector: ', unmute.selector);   
        });

        it('PPE-106791 Mobile - Verify that on tapping video ad we should be able to un mute the sound', function ()
        {
            browser.pause(1000);
            browser.click('#layout-video-component .teads-ui-component-fullscreenbutton.show');
            browser.pause(2000);
                
            browser.frameParent();
            browser.frameParent();
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            browser.pause(1000);
            var unmute = browser.elements("div#main-container #layout-video-component .teads-ui-component-soundbutton.show div.icon-muteoff");
            console.log("********* Test case 4 - Verify that video ad can be un-muted************");
            //console.log('unmute content: ', unmute);
            //console.log('unmute value: ', unmute.value);
            //console.log('unmute selector: ', unmute.selector);

            browser.click('#layout-video-component div.teads-ui-component-fullscreenbutton.show div');
            browser.pause(3000);

            var unmute = browser.elements("#layout-video-component div.teads-ui-component-soundbutton.muted.show div.icon-muteon");
            //console.log('mute content: ', unmute);
            //console.log('mute value: ', unmute.value);
            //console.log('mute selector: ', unmute.selector);
        });

        it('PPE-107498 Mobile - Verify that the player width aligns with the margins of the centre content well', function ()
        {
            var elem0 = $('#layout-video-component');
            var widthDisplay0 = elem0.getCssProperty('width');
            //console.log("widthDisplay: "+widthDisplay0.value);
            console.log("********* Test case 5 - Verify that the player width aligns with the margins of the center content well************");
            (widthDisplay0.value).should.be.equal("340px");
        });

        it('PPE-107487 Mobile - Verify that the ad video remains expanded the entire time', function ()
        {
            var endscreenVisible = browser.waitForVisible('#layout-video-component div.teads-ui-component-endscreen.show',30000);
            //console.log(endscreenVisible);
            endscreenVisible.should.be.equal(true);
            browser.frameParent();
            browser.frameParent();
            browser.pause(2000);
            var my_frame2 = $('div#main-container #layout-video-component #vpaid-container iframe');
            browser.frame(my_frame2.value);
            var videoVisible = browser.isVisible("#vpaid-container video");
            //console.log(videoVisible);
            console.log("********* Test case 6 - Verify that the ad video remains expanded the entire time************");
            videoVisible.should.be.equal(true);
        });

        it('PPE-107496 Mobile - Verify that "Replay" button should be displayed after the video completes playing', function ()
        {
            browser.frameParent();
            browser.frameParent();
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var replayVisible = browser.isVisible('#layout-video-component div.teads-ui-component-endscreen.show div.button-container div.button.replay-button');
            //console.log(replayVisible);
            console.log("********* Test case 7 - Verify that Replay button should be displayed after the video completes playing************");
            replayVisible.should.be.equal(true);
            //browser.pause(3000);
        });

        it('PPE-106792 Mobile - Verify that on tapping close(x) in the top-right corner of the video ad should collapse the ad', function ()
        {
            var closebuttonVisible = browser.isVisible('div#main-container #layout-video-component div.teads-ui-component-endscreen.show div.close-button');
            //console.log(closebuttonVisible);
            console.log("********* Test case 8 - Verify that on tapping close(x) in the top-right corner of the video ad should collapse the ad************");
            closebuttonVisible.should.be.equal(true);
            
            browser.click('#layout-video-component div.teads-ui-component-endscreen.show div.close-button div.icon-closeendscreen');
            browser.pause(2000);
            browser.frameParent();
            browser.frameParent();
            browser.scroll("#ContentPane30 article div.article-body div[data-page='"+(i+1)+"'] div.teads-inread");
            browser.pause(2000);
        });

        it('PPE-107493 Mobile - Verify video ad should pause when you scroll the ad out of view & PPE-107494 Mobile - Verify that the video ad auto-resumes from the point where it is scrolled out of view', function ()
        {
            browser.refresh();
            browser.pause(2000);
            browser.frameParent();
            browser.frameParent();
            //browser.scroll('#ContentPane30 article div.article-body div.article-page .teads-inread');
            browser.scroll(0,500);
            browser.pause(3000);
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            //var mute = browser.elements("div#main-container #layout-video-component .teads-ui-component-soundbutton.muted.show .equalizer");
            //console.log('mute content: ', mute);
            //console.log('mute value', mute.value);
            //console.log('mute selector', mute.selector);

            var elem2 = $('#layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay2 = elem2.getCssProperty('width');
            //console.log("*********************");
            //console.log("Progress bar width display when scrolled out of view: "+widthDisplay2.value);

            browser.pause(1000);
            var elem3 = $('#layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay3 = elem3.getCssProperty('width');
            //console.log("*********************");
            //console.log("Progress bar width display when scrolled out of view and after 1000 ms: "+widthDisplay3.value);
            console.log("********* Test case 9 - Verify video ad should pause when you scroll the ad out of view************");
            (widthDisplay2.value).should.be.equal(widthDisplay3.value);
            
            browser.frameParent();
            browser.frameParent();
            browser.scroll('#ContentPane30 article div.article-body div.article-page.active-page .teads-inread');

            browser.pause(1000);
            browser.frameParent();
            browser.frameParent();
            var my_frame1 = $('div#ContentPane30 .article .article-body div#teads'+i+' iframe');
            browser.frame(my_frame1.value);
            var elem4 = $('#layout-video-component div.teads-ui-component-progressbar.show div');
            var widthDisplay4 = elem4.getCssProperty('width');
            //console.log("*********************");
            //console.log("Progress bar width display after auto-resume: "+widthDisplay4.value);
            console.log("********* Test case 10 - Verify video ad auto-resume from the point where you scrolled out of view************");
            (widthDisplay4.value).should.be.above(widthDisplay3.value);
            browser.pause(2000);
            browser.frameParent();
            browser.frameParent();
            browser.pause(4000);
            try
            {
                if(browser.elements("#ContentPane30 article div.article-body div[data-page='"+(i+2)+"'] p:nth-child(5)"))
                {
                    browser.scroll("#ContentPane30 article div.article-body div[data-page='"+(i+2)+"'] p:nth-child(5)");
                }
            }
            catch(NoSuchElementException)
            {
                try
                {
                    if(browser.elements("#ContentPane30 article div.article-body div[data-page='"+(i+2)+"'] ul:nth-child(5)"))
                    {
                        browser.scroll("#ContentPane30 article div.article-body div[data-page='"+(i+2)+"'] ul:nth-child(5)");
                        browser.pause(2000);
                        browser.scroll(0,400);
                    }
                }
                catch(NoSuchElementException)
                {
                    browser.scroll("#ContentPane30 article div.article-body div[data-page='"+(i+2)+"'] footer");
                    browser.pause(2000);
                    browser.scroll(0,300);
                }
            }
            browser.pause(5000);
        });
    }
    for (var i = 0; i < 2; i++)
    {
        _fn(i);
    }
});