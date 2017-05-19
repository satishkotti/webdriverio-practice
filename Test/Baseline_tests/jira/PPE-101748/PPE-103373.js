var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var socialIcons = require('./../../../common/functions/Common.actions');
var search = require('./../../../common/elements/Common.elements');

var Input = require('./../../../config/PPE-101748.testdata')[argv.env];
describe('Validation of social share icons  for social  icons ', function () {
  this.timeout(60000);


  it("Validation for twitter when user clicks on twitter and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Twitter_Page_Title = 'Post a Tweet on Twitter';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle(search.twitter.selector,search.twitter.selector);
    actions.Navigated_Title.should.equal(Twitter_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for Facebook when user clicks on Facebook and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Facebook_Page_Title = 'Facebook';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle(search.facebook.selector,search.twitter.selector);
    actions.Navigated_Title.should.equal(Facebook_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for Pintrest when user clicks on Pintrest and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Pintrest_Page_Title = 'Pinterest • The world’s catalog of ideas';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle(search.footer_pintrest.selector,search.twitter.selector);
    actions.Navigated_Title.should.equal(Pintrest_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for footer twitter when user clicks on footer twitter and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Twitter_Page_Title = 'Post a Tweet on Twitter';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle(search.footer_twitter.selector,search.footer_facebook.selector);
    actions.Navigated_Title.should.equal(Twitter_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for footer Facebook when user clicks on footer Facebook and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Facebook_Page_Title = 'Facebook';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle(search.footer_facebook.selector,search.footer_facebook.selector);
    actions.Navigated_Title.should.equal(Facebook_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for footer Pintrest when user clicks on footer Pintrest and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Pintrest_Page_Title = 'Pinterest • The world’s catalog of ideas';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle(search.footer_pintrest.selector,search.footer_facebook.selector);
    actions.Navigated_Title.should.equal(Pintrest_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for sticky header twitter when user clicks on sticky header twitter and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Twitter_Page_Title = 'Post a Tweet on Twitter';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle("//*[@id='ContentPane14']/div[1]/div/div[3]/div/div[1]/a[1]","//*[@id='ContentPane64']/div/div/div[1]/p");
    actions.Navigated_Title.should.equal(Twitter_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for sticky header Facebook when user clicks on sticky header Facebook and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Facebook_Page_Title = 'Facebook';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle("//*[@id='ContentPane14']/div[1]/div/div[3]/div/div[1]/a[3]","//*[@id='ContentPane64']/div/div/div[1]/p");
    actions.Navigated_Title.should.equal(Facebook_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

  it("Validation for sticky header Pintrest when user clicks on sticky header Pintrest and it will opens in new window", function () {
    //console.log(search.twitter.selector);
    var Pintrest_Page_Title = 'Pinterest • The world’s catalog of ideas';
    var name1 = '8 Tips for Nighttime Cough Relief';
    var actions = socialIcons.click_getWindowTitle("//*[@id='ContentPane14']/div[1]/div/div[3]/div/div[1]/a[2]","//*[@id='ContentPane64']/div/div/div[1]/p");
    actions.Navigated_Title.should.equal(Pintrest_Page_Title);
    actions.Home_Title.should.equal(name1);
  });

});