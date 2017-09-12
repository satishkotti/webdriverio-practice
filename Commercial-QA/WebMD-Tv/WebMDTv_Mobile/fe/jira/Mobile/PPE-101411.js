var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var splashpage = require('./../../../common/elements/splashpage');
var PlayerOptions = require('./../../../common/elements/WebMDtv');
var functions = require('./../../../common/functions/Common_functions');
var Input = require('./../../../config/Webmd-tv')[argv.env];

var URL = Input.environment;
console.log(splashpage.ads1)
describe('Add WebMD TV Design Option to About and Transcript Screens', function () {

    browser.url(URL);
    browser.pause(50000);
    browser.refresh();
    it('It will verifies height and width of the about ', function (done) {
        var about = functions.cssProperties(PlayerOptions.about);
        about.height.should.containEql('35');
        about.width.should.containEql('80');
        browser.click(PlayerOptions.about.selector);
        browser.pause(1000)
    });

   it('PPE-108204:Verify that "About" Text is visible when about section expands ', function () {

        var aboutcnttext = functions.get_Text(PlayerOptions.abt_cnt_about);
        aboutcnttext.should.equal('ABOUT')
        var aboutcnttextcss = functions.cssProperties(PlayerOptions.abt_cnt_about);
        aboutcnttextcss.height.should.containEql('30');
        aboutcnttextcss.width.should.containEql('86');
        aboutcnttextcss.fontFamily.should.containEql('source sans pro');
        aboutcnttextcss.fontSize.should.containEql('18');
        aboutcnttextcss.fontColor.should.containEql('#00d5e0');
    });

    it('PPE-108207:Verify that Video Title is visible when about section expands ', function () {


        var aboutcnttext = functions.get_Text(PlayerOptions.abt_cnt_heading);
        aboutcnttext.should.equal('From Survivor to Thriver: The Healing Power of Giving Back\n4:12');
        var aboutcntvideotitlecss = functions.cssProperties(PlayerOptions.abt_cnt_heading);
        aboutcntvideotitlecss.height.should.containEql('66');
        aboutcntvideotitlecss.width.should.containEql('360');
        aboutcntvideotitlecss.fontFamily.should.containEql('source sans pro');
        aboutcntvideotitlecss.fontSize.should.containEql('15');
        aboutcntvideotitlecss.fontColor.should.containEql('#ffffff');
    });

    it('PPE-108208:Verify that Video Duration is visible when about section expands ', function () {
        var aboutcnttext = functions.get_Text(PlayerOptions.abt_cnt_heading);
        aboutcnttext.should.containEql('4:12');
    });

    it('PPE-108210:Verify that Sources title text is visible when about section expand', function () {

        var aboutcnttext = functions.get_Text(PlayerOptions.abt_cnt_scr);
        aboutcnttext.should.equal('SOURCES');
        var aboutcntsourcetitlecss = functions.cssProperties(PlayerOptions.abt_cnt_scr);
        aboutcntsourcetitlecss.height.should.containEql('28');
        aboutcntsourcetitlecss.width.should.containEql('360');
        aboutcntsourcetitlecss.fontFamily.should.containEql('roboto condensed');
        aboutcntsourcetitlecss.fontSize.should.containEql('14');
        aboutcntsourcetitlecss.fontColor.should.containEql('#00d5e0');
    });

    it('PPE-108211:Verify that Sources Content is visible when about section expands', function () {

        var aboutcnttext = functions.is_Visible(PlayerOptions.abt_cnt_scr);
        aboutcnttext.should.equal(true);
        var aboutcntsourcecntcss = functions.cssProperties(PlayerOptions.abt_cnt_scr_txt);
        aboutcntsourcecntcss.height.should.containEql('161');
        aboutcntsourcecntcss.width.should.containEql('360');
        aboutcntsourcecntcss.fontFamily.should.containEql('source sans pro');
        aboutcntsourcecntcss.fontSize.should.containEql('14');
        aboutcntsourcecntcss.fontColor.should.containEql('#cacaca');
    });

    it('PPE-108209:Verify that Synopsis Text is visible when about section expands', function () {
        var aboutcnttext = functions.is_Visible(PlayerOptions.abt_cnt_synp_txt);
        aboutcnttext.should.equal(true);
        var aboutcntSynopsiscss = functions.cssProperties(PlayerOptions.abt_cnt_synp_txt);
        aboutcntSynopsiscss.height.should.containEql('57');
        aboutcntSynopsiscss.width.should.containEql('360');
        aboutcntSynopsiscss.fontFamily.should.containEql('source sans pro');
        aboutcntSynopsiscss.fontSize.should.containEql('15');
        aboutcntSynopsiscss.fontColor.should.containEql('#ffffff');
    });

    it('PPE-108212:Verify that Copyright is visible when about section expands', function () {

        var aboutcnttext = functions.get_Text(PlayerOptions.abt_cnt_cpyrt_txt);
        aboutcnttext.should.containEql('All rights reserved');
        var aboutcntCopyrightcss = functions.cssProperties(PlayerOptions.abt_cnt_cpyrt_txt);
        aboutcntCopyrightcss.height.should.containEql('30');
        aboutcntCopyrightcss.width.should.containEql('360');
        aboutcntCopyrightcss.fontFamily.should.containEql('source sans pro');
        aboutcntCopyrightcss.fontSize.should.containEql('14');
        aboutcntCopyrightcss.fontColor.should.containEql('#cacaca');
    });

    it('PPE-108205:Verify that "X" link is visible when about section expands', function () {
        var aboutcnttext = functions.is_Visible(PlayerOptions.abt_cnt_cls_btn);
        aboutcnttext.should.equal(true);
    });

    it('PPE-108205:Verify that "X" link is not visible when about section expands', function () {

        browser.click(PlayerOptions.abt_cnt_cls_btn.selector);
        var aboutcnttext1 = functions.is_Visible(PlayerOptions.abt_cnt_about);
        //console.log(aboutcnttext1);
        aboutcnttext1.should.equal(false);
    });

    //******************************************************************************************************

    //Transcript functionality
    it('PPE-108218:verify Transcript section expands after user clicks on about link and shows all About elements and matching with mock screen', function () {

        browser.click(PlayerOptions.transcript.selector)
        browser.pause(5000)
        var transcriptexist = functions.is_Existing(PlayerOptions.trans_cnt_transcript);
        transcriptexist.should.equal(true);
    });

    it('PPE-108219:Verify that Transcript text if necessary is visible when Transcript section expands', function (done) {
        var transcriptcnttext = functions.get_Text(PlayerOptions.trans_cnt_transcript);
        transcriptcnttext.should.equal('TRANSCRIPT');
        var transcriptcntcss = functions.cssProperties(PlayerOptions.trans_cnt_transcript);
        transcriptcntcss.height.should.containEql('30');
        transcriptcntcss.width.should.containEql('86');
        transcriptcntcss.fontFamily.should.containEql('source sans pro');
        transcriptcntcss.fontSize.should.containEql('18');
        transcriptcntcss.fontColor.should.containEql('#00d5e0');
    });

    it('PPE-108222:Verify that Time Identifier if necessary is visible when Transcript section expands', function () {
        var transcriptexist = functions.is_Existing(PlayerOptions.trans_cnt_time);
        transcriptexist.should.equal(true);
        var transcriptcntTimecss = functions.cssProperties(PlayerOptions.trans_cnt_time);
        transcriptcntTimecss.height.should.containEql('25');
        transcriptcntTimecss.width.should.containEql('345');
        transcriptcntTimecss.fontFamily.should.containEql('source sans pro');
        transcriptcntTimecss.fontSize.should.containEql('20');
        transcriptcntTimecss.fontColor.should.containEql('#00d5e0');
    });

    it('PPE-108223:Verify that Speaker Name if necessary is visible when Transcript section expands', function () {

        var transcriptexist = functions.is_Existing(PlayerOptions.trans_cnt_Name);
        transcriptexist.should.equal(true);
        var transcriptcntSpeakercss = functions.cssProperties(PlayerOptions.trans_cnt_Name);
        transcriptcntSpeakercss.height.should.containEql('30');
        transcriptcntSpeakercss.width.should.containEql('345');
        transcriptcntSpeakercss.fontFamily.should.containEql('source sans pro');
        transcriptcntSpeakercss.fontSize.should.containEql('20');
        transcriptcntSpeakercss.fontColor.should.containEql('#ffffff');
    });

    it('PPE-108224:Verify that Speaker Text if necessary is visible when Transcript section expands', function () {

        var transcriptexist = functions.is_Existing(PlayerOptions.trans_cnt_spk_txt);
        transcriptexist.should.equal(true);
        var transcriptcntSpeakertxtcss = functions.cssProperties(PlayerOptions.trans_cnt_spk_txt);
        transcriptcntSpeakertxtcss.height.should.containEql('337');
        transcriptcntSpeakertxtcss.width.should.containEql('345');
        transcriptcntSpeakertxtcss.fontFamily.should.containEql('source sans pro');
        transcriptcntSpeakertxtcss.fontSize.should.containEql('17');
        transcriptcntSpeakertxtcss.fontColor.should.containEql('#ffffff');
    });

    it('PPE-108220:Verify that X link is visible when transcript section expands', function () {
        var transcriptexist = functions.is_Existing(PlayerOptions.trans_cnt_cls);
        transcriptexist.should.equal(true);
        
    });


    it('PPE-108221:Verify the transcript section is closed when user clicks on X link', function () {
        browser.click(PlayerOptions.trans_cnt_cls.selector)
        browser.pause(5000)
        var transcriptexist = functions.is_Existing(PlayerOptions.trans_cnt_cls);
        transcriptexist.should.equal(false);
    });


})
