var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../common/functions/functions');
var spage = require('./../../common/actions/PPE-121298.actions')
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../config/Webmd-tv')[argv.env];
var splashpage = Input.splashpagevideourl;
 var Surveyclose=  splashelement.Surveyclose.selector;
 var reactionopt, reactionoptnal;
describe(' PPE-121298 Make Reaction Button Optional ', function () {
  
  it('     PPE-125668 Verify that Reaction Button is optional for the cards in UGC module for video ', function () {
  reactionopt = spage.reactionoptional();
   reactionopt.exist.should.equal(false);
   
 

  });

  it('PPE-125669 Verify that Reaction Button is optional for the cards in UGC module for article ', function () {
   reactionoptnal = spage.reactionarticleoptional();
   reactionoptnal.exist.should.equal(false);
   
 

  });
 
 
  
});