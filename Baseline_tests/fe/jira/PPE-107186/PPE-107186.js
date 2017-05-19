var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
console.log(__dirname);
var comm_actions = require('./../../../common/functions/Common.actions');
var Input = require('./../../../config/FE_Smoke_SS.testdata')[argv.env];
var URL = Input.environment;
//open the url
browser.url(URL);
  //this.timeout(90000);
  browser.pause(50000);
describe('PPE-107186:Update fonts in ICM w/ ISI', function () {
    it("PPE-109333:Verify the From our Sponsor Text has font = Roboto Condensed, 12px for small sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Roboto Condensed');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('12px');
    });
    it("PPE-109334:Verify the Title Text has font = Source Sans; bold, 20px for small sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Source Sans; bold');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('20px');
    });
    it("PPE-109335:Verify the CTA Text has font = Source Sans; bold; bold, 15px for small sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Source Sans; bold');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('15px');
    });
     it("PPE-109337:Verify the ISIText has font = Source Sans; regular and bold, 12px for small sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Source Sans; regular and bold');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('12px');

    });
    it("PPE-109338:Verify the From our Sponsor Text has font = Roboto Condensed, 12px for large sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Roboto Condensed');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('12px');
    });
    it("PPE-109339:Verify the Title Text has font = Source Sans; bold, 26px for large sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Source Sans; bold');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('26px');
    });
    it("PPE-109340:Verify the CTA Text has font = Source Sans; bold; bold, 13px for large sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Source Sans; bold');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('13px');
    });
     it("PPE-109341:Verify the ISI Text has font = Source Sans; regular and bold, 13px for large sized ICM", function () {
       var font_family = comm_actions.verify_Css(locator,'font-family');
       font_family.should.equal('Source Sans; regular and bold');
       var font_size=comm_actions.verify_Css(locator,'font-size');
       font_size.should.equal('13px');
       
    });
     it("PPE-109342:Verify all ICM links works as expected", function () {
       browser.click(linklocator);
       var curr_url = browser.getUrl();
       curr_url.should.equal("expecetd url");
       
    });
});