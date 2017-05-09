var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var filmstripfunction = require('./../../../common/functions/PPE-100619.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.environment;
var filmstrip;
var title;


describe('Style WebMD TV Carousel/Filmstrip', function () {
  this.timeout(100000);
  it("Validate Left arrow height and width validations", function () {

    filmstrip = filmstripfunction.filmstrip();
    if(filmstrip.leftarrowwidth.value=='41px'){
    filmstrip.leftarrowwidth.value.should.equal("41px");
    filmstrip.leftarrowheight.value.should.equal("40px");
  }
  else{
    filmstrip.leftarrowwidth.value.should.equal("80px");
    filmstrip.leftarrowheight.value.should.equal("50px");
  }

  });
  it("Validate Left Navigation height and width validations", function () {
    filmstrip.leftnavigationarrowwidth.value.should.equal("11.1px");
    filmstrip.leftnavigationarrowheight.value.should.equal("19.6px");
  });
  it("Validate Right arrow height and width validations", function () {
    if(filmstrip.leftarrowwidth.value=='41px'){
    filmstrip.rightarrowwidth.value.should.equal("41px");
    filmstrip.rightarrowheight.value.should.equal("40px");
  }
  else{
    filmstrip.rightarrowwidth.value.should.equal("80px");
    filmstrip.rightarrowheight.value.should.equal("50px");
  }
  });
  it("Validate Right Navigation height and width validations", function () {
    filmstrip.rightnavigationarrowwidth.value.should.equal("11.1px");
    filmstrip.rightnavigationarrowheight.value.should.equal("19.6px");

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
      title.episodefontsize[i].value.should.equal("11px");
      //title.image[i].should.equal('true');
      console.log(title.titletext);
      console.log(title.texttitle);
      title.titletext.should.equal(title.texttitle);
      title.imagewidth[i].value.should.equal("210px");
      title.imageheight[i].value.should.equal("200px");


    }
  });
  it("Image is existing", function () {
    for (var i = 0; i < title.image[i].length; i++) {
      title.image[i].should.equal('true');


    }
  });
});
