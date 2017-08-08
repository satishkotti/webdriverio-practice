var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var filmstripfunction = require('./../../common/actions/PPE-100619.actions');
var rootPath = path.normalize(__dirname)
//var Input = require('./../../config/Webmd-tv')[argv.env];
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.filmstrip;
var filmstrip;
var title;


describe('Style WebMD TV Carousel/Filmstrip', function () {
  this.timeout(100000);
  browser.url(url);
  it("Validate Left arrow height and width validations", function () {

    filmstrip = filmstripfunction.filmstrip();
    if (filmstrip.leftarrowcssProperties.width == '41px') {
      filmstrip.leftarrowcssProperties.width.should.equal("41px");
      filmstrip.leftarrowcssProperties.height.should.containEql("40px");
    }
    else {
      filmstrip.leftarrowcssProperties.width.should.equal("62px");
      filmstrip.leftarrowcssProperties.height.should.containEql("54");
    }

  });
  it("Validate Left Navigation height and width validations", function () {
    filmstrip.leftnavigationarrowcssProperties.width.should.equal("22px");
    filmstrip.leftnavigationarrowcssProperties.height.should.containEql("30");
  });
  it("Validate Right arrow height and width validations", function () {
    if (filmstrip.rightarrowcssProperties.width == '41px') {
      filmstrip.rightarrowcssProperties.width.value.should.equal("41px");
      filmstrip.rightarrowcssProperties.height.should.equal("40px");
    }
    else {
      filmstrip.rightarrowcssProperties.width.should.equal("62px");
      filmstrip.rightarrowcssProperties.height.should.containEql("54");
    }
  });
  it("Validate Right Navigation height and width validations", function () {
    filmstrip.rightnavigationarrowcssProperties.width.should.equal("22px");
    filmstrip.rightnavigationarrowcssProperties.height.should.containEql("30");

  });


  it("Font size validations for title", function () {
    browser.url(url);
    filmstripv = filmstripfunction.filmstripvalidation();
    filmstripv.videoTitlefont.value.should.equal("18px");
    //  for (var i = 0; i < title.fontsize.length; i++) {
    //    title.fontsize[i].value.should.equal("17px");

    //  }

  });
  it("Font color validations for title", function () {
    filmstripv.videoTitlecolor.parsed.hex.should.equal("#ffffff");
    // for (var i = 0; i < title.fontcolor.length; i++) {
    //   title.fontcolor[i].parsed.hex.should.equal("#f2eef3");
    // console.log("veera"+title.alltitles[i]);
    // }
  });
  it("Font family validations for title", function () {
    filmstripv.videoTitlefmaily.value.should.equal("source sans pro");
    //  for (var i = 0; i < title.fontsize.length; i++) {
    //    title.fontsize[i].value.should.equal("17px");

    //  }

  });
  it("verifying image width and height", function () {
    filmstripv.imageheight.value.should.containEql("148");
    filmstripv.imagewidth.value.should.containEql("154");
  });
  /*it("fontfamily,fontcolor,fontsize validations for episode title", function () {
    for (var i = 0; i < title.episodefontfamily.length; i++) {
      title.episodefontfamily[i].value.should.equal("source sans pro");
      title.episodefontcolor[i].parsed.hex.should.equal("#00d5e0");
      title.episodefontsize[i].value.should.equal("12px");
      title.titletext.should.equal(title.texttitle);
      title.imagewidth[i].value.should.containEql("205");
      title.imageheight[i].value.should.containEql("196");


    }
  });*/
  it("verifying image width and height", function () {
    filmstripv.filmstriptcolor.parsed.hex.should.equal("#f2eef3");
    filmstripv.filmstriptsize.value.should.equal("13px");
    filmstripv.filmstriptfamily.value.should.equal("source sans pro");
  });
  /*it("Play icon css validations for all the videos", function () {
  for (var i = 0; i < title.playiconsheight.length; i++) {
  title.playiconsheight[i].value.equal("38");
  title.playiconswidth[i].value.should.equal("38");
  
  }
  });*/

  /*
  it("css_validation for episode and videoTitle icons",function(){
  browser.url(url);
  var properties=filmstripfunction.css_validation();
  console.log(properties);
  //for (i=0;i<=6;i++){
  //properties.fontcolor[i].parsed.hex.should.equal();
  //properties.fontfamily[i].value.should.equal();
  //properties.fontsize[i].value.should.equal();
  
  //}
});*/

  it("validating next video in Filmstrip", function () {

    filmstripv.next.should.equal(filmstripv.next1);
    filmstripv.current.should.equal(filmstripv.next1);

  });

});
