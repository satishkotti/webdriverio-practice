var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../common/actions/PPE-100761.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var url = Input.marqueeheader;
var title;


describe('PPE-100761 Build the WebMD TV Content Grids', function () {
  //this.timeout(100000);

  it("Validate font size , font family and color of grid titles(Articles,slideshow,Quizes)", function () {
    title = assetpage.grid1();
      for (var i = 0; i < title.gridtypefsize.length; i++) {
      title.gridtypefsize[i].value.should.equal("14px");
      title.gridtypeffamily[i].value.should.equal("roboto condensed");
      if((title.gridtypeText[i]) == 'FROM OUR SPONSOR'){
      title.gridtypecolor[i].parsed.hex.should.equal("#ea480a");
    }
    else{
      title.gridtypecolor[i].parsed.hex.should.equal("#067f85");
    }
    }
  });

    it("Validate font size , font family and color of grid names", function () {
    //title = assetpage.grid1();  
      for (var i = 0; i < title.gridtypefsize.length; i++) {
      title.gridtitlefsize[i].value.should.equal("33px");
      title.gridtitleffamily[i].value.should.equal("source sans pro");
      title.gridtitlecolor[i].parsed.hex.should.equal("#2b2c34");
    }
  });

      it("Validate for height and width of grid images", function () {
    //title = assetpage.grid1();
    //console.log(title.gridtypefsize);
      for (var i = 0; i < title.gridtypefsize.length; i++) {
      title.gridimageheight[i].value.should.equal("180px");
      title.gridimagewidth[i].value.should.equal("190px");
      //title.gridtitlecolor[i].parsed.hex.should.equal("#2b2c34");
    }
  });

      it("Validate grid title properties", function () {
      title.titleproperties.fontSize.should.equal("22px");
      title.titleproperties.fontColor.should.equal("#554c57");
      title.titleproperties.fontFamily.should.equal("source sans pro");
      
   
  });
  it("Validate height and width of ad right to the grid",function(){
    console.log("gridadwidth"+JSON.stringify(title.gridadwidth));
      title.gridadwidth.value.should.equal('300px');
      console.log("gridadheight"+JSON.stringify(title.gridadheight));
      title.gridadheight.value.should.containEql('250');
  });
});
