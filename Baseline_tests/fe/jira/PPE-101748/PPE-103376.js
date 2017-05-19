var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var socialIcons = require('./../../../common/functions/Common.actions');
var search = require('./../../../common/elements/Common.elements');

//var Input = require(rootPath + '\\config\\rxtestdata.js')[argv.env];
var Input = require('./../../../config/PPE-101748.testdata')[argv.env];
//var url = Input.url;
//var loginurl = Input.environment;


/*describe('Validation for font SOURCE SANS PRO with Bold 700,Regular 400,Light 300', function () {
  this.timeout(60000);
  it("Validation for SOURCE SANS PRO font- searchFooterInfo", function () {
    search.search();
  });
});*/
describe('Validation of social share icons width=32, height=32', function () {
  this.timeout(60000);
  it("smoke", function () {
    // console.log(search.twitter);
    var actions = socialIcons.verify_width_height(search.twitter.selector);
    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.


  });
  it("Validation for pintrest width and height", function () {
    var actions = socialIcons.verify_width_height(search.pintrest.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });
  it("Validation for facebook width and height", function () {

    var actions = socialIcons.verify_width_height(search.facebook.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });
  it("Validation for email width and height", function () {

    var actions = socialIcons.verify_width_height(search.email.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for footer twitter width and height", function () {
    var actions = socialIcons.verify_width_height(search.footer_twitter.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for footer facebook width and height", function () {
    var actions = socialIcons.verify_width_height(search.footer_facebook.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for footer pintrest width and height", function () {
    var actions = socialIcons.verify_width_height(search.footer_pintrest.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for footer email width and height", function () {
    var actions = socialIcons.verify_width_height(search.footer_email.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for sticky header twitter width and height", function () {
    var actions = socialIcons.verify_width_height(search.sticky_Header_twitter.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for sticky header facebook width and height", function () {
    var actions = socialIcons.verify_width_height(search.sticky_Header_facebook.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });

  it("Validation for sticky header pintrest width and height", function () {
    var actions = socialIcons.verify_width_height(search.sticky_Header_pintrest.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });
  it("Validation for sticky header email width and height", function () {
    var actions = socialIcons.verify_width_height(search.sticky_Header_email.selector);

    actions.height.value.should.equal('32px');
    actions.width.value.should.equal('32px');
    //actions.height.should.

  });
});