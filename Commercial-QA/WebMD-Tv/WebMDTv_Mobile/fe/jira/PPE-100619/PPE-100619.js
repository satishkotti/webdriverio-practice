var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var filmstripfunction = require('./../../../common/actions/PPE-100619.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.environment;
var filmstrip;
var title;


describe('Style WebMD TV Carousel/Filmstrip', function () {
  this.timeout(100000);
  it("Validate Load More", function () {
    filmstrip = filmstripfunction.filmstrip();
    filmstrip.loadMorewidth.should.equal("360px");
    filmstrip.loadMoreheight.should.equal("77px");
    filmstrip.loadMorecolor.should.equal("#ebe1dc");
  });

  it("Font size validations for title", function () {
    title = filmstripfunction.episode();
      for (var i = 0; i < title.fontsize.length; i++) {
      title.fontsize[i].value.should.equal("14px");

    }

  });
  it("Font color validations for title", function () {
    title = filmstripfunction.episode();
    for (var i = 0; i < title.fontcolor.length; i++) {
      title.fontcolor[i].parsed.hex.should.equal("#f2eef3");
    }
  });
  it("fontfamily,fontcolor,fontsize validations for episode title", function () {
    title = filmstripfunction.episode();
    for (var i = 0; i < title.episodefontfamily.length; i++) {
      title.episodefontfamily[i].value.should.equal("source sans pro");
      title.episodefontcolor[i].parsed.hex.should.equal("#00d5e0");
      title.episodefontsize[i].value.should.equal("10px");
      title.image[i].should.equal(true);
      title.imagewidth[i].value.should.containEql("168");
      title.imageheight[i].value.should.containEql("110px");
    }
  });
  it("Image is existing", function () {
    title = filmstripfunction.episode();
    for (var i = 0; i < title.image[i].length; i++) {
      title.image[i].should.equal(true);


    }
  });
});
