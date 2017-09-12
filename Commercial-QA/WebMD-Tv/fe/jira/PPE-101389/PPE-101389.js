var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var infobarfunction = require('./../../../common/actions/PPE-101389.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.environment;



describe('Add WebMD TV Design Option to Video Player Info Bar', function () {
  this.timeout(100000);
  it("Validate infobar values", function () {

    var infobar = infobarfunction.infobar();
    // infobar.infobarfacebookwidthfont.should.equal("12px");

    console.log("FACEBOOK COLOR" + JSON.stringify(infobar.infobarfacebookcolor));
    infobar.infobarfacebookcolor.parsed.hex.should.equal("#00b4ff");
    console.log(infobar.infobarfacebookwidthfont);
    console.log(infobar.infobarfacebookfamily);
    console.log(infobar.infobartwitterwidthfont);
    infobar.infobartwitterwidthfont.value.should.equal("12px");
    console.log(infobar.infobartwittercolor);
    infobar.infobartwittercolor.parsed.hex.should.equal("#00abe3");
    console.log(infobar.infobartranscriptcolor);
    infobar.infobartranscriptcolor.parsed.hex.should.equal("#ffffff");
    console.log(infobar.infobartranscriptfont);
    infobar.infobartranscriptfont.value.should.equal("12px");
    console.log(infobar.infobartranscriptfamily);
    //infobar.infobartranscriptfamily.should.equal()
    console.log(infobar.gettitlefontcolor);
    infobar.gettitlefontcolor.parsed.hex.should.equal("#ffffff");
    console.log(infobar.gettitlefontfamily);
    console.log(infobar.gettitlefontsize);
    infobar.gettitlefontsize.value.should.equal("18px");
    //console.log(infobar.gettitleheight);
    console.log(infobar.aboutcolor);
    infobar.aboutcolor.parsed.hex.should.equal("#ffffff");
    console.log(infobar.aboutfontsize);
    infobar.aboutfontsize.value.should.equal("12px");

  });
});
