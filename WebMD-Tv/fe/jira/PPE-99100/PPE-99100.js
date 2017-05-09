var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../../../common/functions/PPE-99100.actions');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.article;
var webmdurl=Input.webmdurl;



describe('Splash Page Validations', function () {
  this.timeout(100000);
  it('Validating splash page', function () {
    var largevideoheaders = splashpage.splashpagegrids();
    console.log(largevideoheaders.element.value.length);

  });

});
