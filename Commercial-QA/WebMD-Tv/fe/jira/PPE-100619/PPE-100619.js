var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var filmstripfunction = require('./../../../common/actions/PPE-100619.actions');
var rootPath = path.normalize(__dirname)
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.environment;
var filmstrip;
var title;
var url = Input.environment;


describe('Style WebMD TV Carousel/Filmstrip', function () {
  this.timeout(100000);
  it("Validate Left arrow height and width validations", function () {
    browser.url(url);
    filmstrip = filmstripfunction.filmstrip();
    if (filmstrip.leftarrowcssProperties.width == '41px') {
      filmstrip.leftarrowcssProperties.width.should.equal("41px");
      filmstrip.leftarrowcssProperties.height.should.containEql("40px");
    }
    else {
      filmstrip.leftarrowcssProperties.width.should.equal("104px");
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
      filmstrip.rightarrowcssProperties.width.should.equal("104px");
      filmstrip.rightarrowcssProperties.height.should.containEql("54");
    }
  });
  it("Validate Right Navigation height and width validations", function () {
    filmstrip.rightnavigationarrowcssProperties.width.should.equal("22px");
    filmstrip.rightnavigationarrowcssProperties.height.should.containEql("30");

  });
  it("Font size validations for title", function () {
    title = filmstripfunction.episode();
    for (var i = 0; i < title.fontsize.length; i++) {
      title.fontsize[i].value.should.equal("17px");

    }

  });
  it("Font color validations for title", function () {
    for (var i = 0; i < title.fontcolor.length; i++) {
      title.fontcolor[i].parsed.hex.should.equal("#ffffff");
    }
  });
  it("fontfamily,fontcolor,fontsize validations for episode title", function () {
    for (var i = 0; i < title.episodefontfamily.length; i++) {
      title.episodefontfamily[i].value.should.equal("source sans pro");
      title.episodefontcolor[i].parsed.hex.should.equal("#00d5e0");
      title.episodefontsize[i].value.should.equal("12px");
      //title.image[i].should.equal('true');
      console.log(title.titletext);
      console.log(title.texttitle);
      title.titletext.should.equal(title.texttitle);
      title.imagewidth[i].value.should.containEql("205");
      title.imageheight[i].value.should.containEql("196");


    }
  });
  it("Image is existing", function () {
    for (var i = 0; i < title.image[i].length; i++) {
      title.image[i].should.equal('true');


    }
  });
});
