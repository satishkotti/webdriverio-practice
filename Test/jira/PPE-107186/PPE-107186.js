var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
console.log(__dirname);
var comm_actions = require('./../../../common/functions/Common.actions');
var icmLocators = require('./../../../common/elements/ICM.Elements');
var Input = require('./../../../config/FE_testdata')[argv.env];

var URL = Input.ICM_url;
browser.url(URL);
browser.refresh();
browser.pause(90000);
describe('PPE-107186:Update fonts in ICM w/ ISI', function () {

  it("PPE-109333:Verify the From our Sponsor Text has font = Roboto Condensed, 12px for small sized ICM", function () {
    browser.frame('rr');
    var font_family = comm_actions.verify_Css(icmLocators.sponsor_text.selector, 'font-family');
    font_family.value.should.equal('roboto condensed');
    var font_size = comm_actions.verify_Css(icmLocators.sponsor_text.selector, 'font-size');
    font_size.value.should.equal('12px');
  });

  it("PPE-109334:Verify the Title Text has font = Source Sans; bold, 20px for small sized ICM", function () {
    var font_family = comm_actions.verify_Css(icmLocators.title.selector, 'font-family');
    font_family.value.should.equal('source sans pro');
    var font_weight = comm_actions.verify_Css(icmLocators.title.selector, 'font-weight');
    font_weight.value.should.equal('bold');
    var font_size = comm_actions.verify_Css(icmLocators.title.selector, 'font-size');
    font_size.value.should.equal('20px');

  });
  it("PPE-109335:Verify the CTA Text has font = Source Sans;  bold, 15px for small sized ICM", function () {
    var font_family = comm_actions.verify_Css(icmLocators.CTA.selector, 'font-family');
    font_family.value.should.equal('source sans pro');
    var font_weight = comm_actions.verify_Css(icmLocators.CTA.selector, 'font-weight');
    font_weight.value.should.equal('bold');
    var font_size = comm_actions.verify_Css(icmLocators.CTA.selector, 'font-size');
    font_size.value.should.equal('15px');

  });
  it("PPE-109337:Verify the ISIText has font = Source Sans; regular and bold, 12px for small sized ICM", function () {
    var font_family = comm_actions.verify_Css(icmLocators.isi.selector, 'font-family');
    font_family.value.should.equal('source sans pro');
    var font_weight = comm_actions.verify_Css(icmLocators.isi.selector, 'font-weight');
    if (font_weight.value == "normal")
      font_weight.value.should.equal('normal');
    else
      font_weight.value.should.equal('bold');
    var font_size = comm_actions.verify_Css(icmLocators.isi_text1.selector, 'font-size');
    font_size.value.should.equal('12px');
    var font_size = comm_actions.verify_Css(icmLocators.isi_text2.selector, 'font-size');
    font_size.value.should.equal('12px');
    browser.frameParent();

  });




  it("PPE-109338:Verify the From our Sponsor Text has font = Roboto Condensed, 12px for large sized ICM", function () {
    browser.frame('cw');
    var font_family = comm_actions.verify_Css(icmLocators.sponsor_text.selector, 'font-family');
    font_family.value.should.equal('roboto condensed');
    var font_size = comm_actions.verify_Css(icmLocators.sponsor_text.selector, 'font-size');
    font_size.value.should.equal('12px');
  });
  it("PPE-109339:Verify the Title Text has font = Source Sans; bold, 26px for large sized ICM", function () {
    var font_family = comm_actions.verify_Css(icmLocators.title.selector, 'font-family');
    font_family.value.should.equal('source sans pro');
    var font_weight = comm_actions.verify_Css(icmLocators.title.selector, 'font-weight');
    font_weight.value.should.equal('bold');
    var font_size = comm_actions.verify_Css(icmLocators.title.selector, 'font-size');
    font_size.value.should.equal('26px');
  });
  it("PPE-109340:Verify the CTA Text has font = Source Sans; bold; bold, 13px for large sized ICM", function () {
    var font_family = comm_actions.verify_Css(icmLocators.CTA.selector, 'font-family');
    font_family.value.should.equal('source sans pro');
    var font_weight = comm_actions.verify_Css(icmLocators.CTA.selector, 'font-weight');
    font_weight.value.should.equal('bold');
    var font_size = comm_actions.verify_Css(icmLocators.CTA.selector, 'font-size');
    font_size.value.should.equal('13px');
    var text_align = comm_actions.verify_Css(icmLocators.CTA.selector, 'text-align');
    text_align.value.should.equal('center');

  });
  it("PPE-109341:Verify the ISI Text has font = Source Sans; regular and bold, 13px for large sized ICM", function () {
    var font_family = comm_actions.verify_Css(icmLocators.isi.selector, 'font-family');
    font_family.value.should.equal('source sans pro');
    var font_weight = comm_actions.verify_Css(icmLocators.isi.selector, 'font-weight');
    if (font_weight.value == "normal")
      font_weight.value.should.equal('normal');
    else
      font_weight.value.should.equal('bold');
    var font_size = comm_actions.verify_Css(icmLocators.isi_text1.selector, 'font-size');
    font_size.value.should.equal('13px');
    var font_size = comm_actions.verify_Css(icmLocators.isi_text2.selector, 'font-size');
    font_size.value.should.equal('13px');

  });

  it("PPE-109342:Verify all ICM links works as expected", function () {
    browser.frameParent();
    browser.frame('rr');
    var new_URL = "http://www.staging.webmd.com/diabetes/blood-sugar-coach-17/diabetes-plan/diabetes-habits-to-quit",
    var curr_URL = comm_actions.verify_linkurl(icmLocators.image.selector, URL, 'rr');
    curr_URL.should.equal(new_URL);
    var curr_URL = comm_actions.verify_linkurl(icmLocators.title.selector, URL, 'rr');
    curr_URL.should.equal(new_URL);
    var curr_URL = comm_actions.verify_linkurl(icmLocators.CTA.selector, URL, 'cw');
    curr_URL.should.equal(new_URL);

    var curr_URL = comm_actions.verify_linkurl(icmLocators.image.selector, URL, 'cw');
    curr_URL.should.equal(new_URL);
    var curr_URL = comm_actions.verify_linkurl(icmLocators.title.selector, URL, 'cw');
    curr_URL.should.equal(new_URL);
    var curr_URL = comm_actions.verify_linkurl(icmLocators.CTA.selector, URL, 'cw');
    curr_URL.should.equal(new_URL);

  })


  it("PPE-109570 Verfiy the ICM logo is not clickable", function () {

    var curr_URL = comm_actions.verify_linkurl(icmLocators.logo.selector, URL, 'rr');
    curr_URL.should.equal(URL);
    browser.frameParent();
    browser.frame('rr');
    var curr_URL = comm_actions.verify_linkurl(icmLocators.logo.selector, URL, 'rr');
    curr_URL.should.equal(URL);
  })
  browser.close();
});
