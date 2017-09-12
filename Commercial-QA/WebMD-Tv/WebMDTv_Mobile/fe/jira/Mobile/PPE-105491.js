var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common_functions')
var PlayerOptions = require('./../../../common/elements/WebMDtv');
var rootPath = path.normalize(__dirname)
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.environment;



describe('Add WebMD TV Design Option to Video Player Info Bar with Video', function () {
    it('Verify video visibility', function () {
        var visible = functions.Element_visibility(PlayerOptions.akamai_video.selector);
        visible.should.equal(true);
    });
    it('Verify that play button appeared on Video control bar', function () {
        var visible = functions.Element_visibility(PlayerOptions.play_button.selector);
        console.log(visible);
        visible.should.equal(true);
        var videoStreamingStatus = functions.currentVideoTimestampVerification(PlayerOptions.play_button.selector,PlayerOptions.current_time.selector);
        expect(videoStreamingStatus > 0).to.be.true;
    });
    it('Verify that pause button appeared on Video control bar', function () {
        browser.click(PlayerOptions.play_button.selector);
        browser.pause(9000);
        var visible = functions.Element_visibility(PlayerOptions.pause_button.selector);
        visible.should.equal(true);
        browser.click(PlayerOptions.play_button.selector);
    });
    it('Verify fullscreen is working or not', function () {
        var visible = functions.Element_visibility(PlayerOptions.fullscreen_button.selector);
        visible.should.equal(true);
        var full_screen_height = functions.check_working_of_full_screen_button(PlayerOptions.akamai_video.selector,PlayerOptions.fullscreen_button.selector);
        full_screen_height.should.greaterThan(202.5);
    }); 
});
