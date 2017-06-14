var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../../common/actions/PPE-100761.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.marqueeheader;
var gridurl = Input.gridurl1;
var gridurl2 = Input.gridurl2;
var gridurl3 = Input.gridurl3;
var gridurl4 = Input.gridurl4;
var gridurl5 = Input.gridurl5;
var gridurl6 = Input.gridurl6;


describe('Build the WebMD TV Content Grids', function () {
  this.timeout(100000);

  it("Validate look and feel of the grid 1 and url validation on clicking title", function () {
    var actions = assetpage.grid1();
    actions.url.should.equal(gridurl);
    actions.article.should.equal("14px");
    //actions.articletitleheight.should.equal(128);
    actions.articletitlewidth.should.containEql('183');
    console.log(actions.articletitlewidth);
    actions.articletitlecolor.should.equal("#2b2c34");
    actions.articletitle.should.equal("20px");
    //actions.articlecolor.parsed.hex.should.equal("#067f85");
    actions.articlecolor.should.equal("#067f85");
    actions.articlefontfamily.should.equal("roboto condensed");
    if (actions.gettitle == "FROM OUR SPONSOR") {
      console.log("Validation for sponsors");
    } else {
      console.log("pakka" + actions.assettype);
      actions.assettype.should.equal(actions.gettitle);
  }

  });
  it("Validate look and feel of the grid 2 and url validation on clicking title", function () {
    var actions = assetpage.grid2();
    actions.url.should.equal(gridurl2);
    actions.article.should.equal("14px");
    console.log(actions.article);
    actions.articletitlecolor.should.equal("#ea480a");
    actions.articletitle.should.containEql("20");
    actions.articlecolor.should.equal("#067f85");
    actions.articlefontfamily.should.equal("roboto condensed");
    if (actions.gettitle == "FROM OUR SPONSOR") {
      console.log("Validation for sponsors");
      actions.titlecolor.should.equal("#ea480a");
    } else {
      console.log("pakka2" + actions.assettype2);
      actions.assettype2.should.equal(actions.gettitle);
    }
  });
  it("Validate look and feel of the grid 3 and url validation on clicking title", function () {
    var actions = assetpage.grid3();
    actions.url.should.equal(gridurl3);
    actions.article.should.equal("14px");
    actions.articletitlewidth.should.containEql('183');
    console.log(actions.articletitlewidth);
    actions.articletitlecolor.should.equal("#2b2c34");
    actions.articletitle.should.equal("20px");
    actions.articlecolor.should.equal("#067f85");
    actions.articlefontfamily.should.equal("roboto condensed");
    if (actions.gettitle == "FROM OUR SPONSOR") {
      console.log("Validation for sponsors");
    } else {
      console.log("pakka3" + actions.assettype3);
      actions.assettype3.should.equal(actions.gettitle);
    }
  });
  it("Validate look and feel of the grid 4 and url validation on clicking title", function () {
    var actions = assetpage.grid4();
    actions.url.should.equal(gridurl4);
    actions.article.should.equal("14px");
    actions.articletitlewidth.should.containEql("183");
    actions.articletitlecolor.should.equal("#2b2c34");
    actions.articletitle.should.equal("20px");
    actions.articlecolor.should.equal("#067f85");
    actions.articlefontfamily.should.equal("roboto condensed");
        if (actions.gettitle == "FROM OUR SPONSOR") {
      console.log("Validation for sponsors");
    } else if (actions.gettitle == "ARTICLE") {
      console.log("pakka4" + actions.assettype4);
      actions.assettype4.should.equal(actions.gettitle);
    } else {
      console.log("This is not an article" + actions.gettitle);
      //console.log(actions.gettitle);

    }
  });
  it("Validate look and feel of the grid 5 and url validation on clicking title", function () {
    var actions = assetpage.grid5();
    actions.url.should.equal(gridurl5);
    actions.article.should.equal("14px");
    //actions.articletitleheight.should.equal(128);
    actions.articletitlewidth.should.containEql('183');
    actions.articletitlecolor.should.equal("#2b2c34");
    actions.articletitle.should.equal("20px");
    actions.articlecolor.should.equal("#067f85");
    actions.articlefontfamily.should.equal("roboto condensed");
    //console.log(actions.gettitle);
    if (actions.gettitle == "FROM OUR SPONSOR") {
      console.log("Validation for sponsors");
    } else if (actions.gettitle == "ARTICLE") {
      console.log("pakka5" + actions.assettype5);
      actions.assettype5.should.equal(actions.gettitle);
    } else {
      console.log("This is not an article" + actions.gettitle);
      //console.log(actions.gettitle);

    }
  });
  it("Validate look and feel of the grid 6 and url validation on clicking title", function () {
    var actions = assetpage.grid6();
    actions.url.should.equal(gridurl6);
    actions.article.should.equal("14px");
    //actions.articletitleheight.should.equal(128);
    actions.articletitlewidth.should.containEql('183');
    actions.articletitlecolor.should.equal("#2b2c34");
    actions.articletitle.should.equal("20px");
    console.log(JSON.stringify(actions.articletitlefontfamily));
    actions.articlecolor.should.equal("#067f85");
    actions.articlefontfamily.should.equal("roboto condensed");
    //console.log(actions.gettitle);
    if (actions.gettitle == "FROM OUR SPONSOR") {
      console.log("Validation for sponsors");
    } else if (actions.gettitle == "ARTICLE") {
      console.log("pakka6" + actions.assettype6);
      actions.assettype6.should.equal(actions.gettitle);
    } else {
      console.log("This is not an article" + actions.gettitle);
      //console.log(actions.gettitle);

    }
  });
  it('url validation on clicking Grid image1', function () {

    var image = assetpage.gridimageclick1();
    image.imageheight1.should.containEql('125');
    image.imagewidth1.should.containEql('132');
    image.url.should.equal(gridurl);
    console.log(image.assettypeimage1);
    image.assettypeimage1.should.equal("ARTICLE");
    console.log(image.gettitle);
  });
  it('url validation on clicking Grid image2', function () {

    var image = assetpage.gridimageclick2();
    image.imageheight2.should.containEql('125');
    image.imagewidth2.should.containEql('132');
    image.url2.should.equal(gridurl2);
    console.log("validations" + image.assettypeimage2);
    //    image.assettypeimage2.should.equal(image.gettitle);
    //console.log(image.gettitle);
  });
  it('url validation on clicking Grid image3', function () {
    var image = assetpage.gridimageclick3();
    image.imageheight3.should.containEql('125');
    image.imagewidth3.should.containEql('132');
    image.url3.should.equal(gridurl3);
    console.log(image.assettypeimage3);
    image.assettypeimage3.should.equal("ARTICLE");
    console.log(image.gettitle);
  });
});
