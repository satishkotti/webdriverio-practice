var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var dataentry = require('./../../common/actions/PPE-99104.actions');
//var Input = require('./../../config/Webmd-tv')[argv.env];
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
console.log(env);
var rightad = Input.withrightad;
var article = Input.article;
var apps = Input.apps;
var dataentrymodule;
var articledataentry;
var splashdataentry;
var Responsive = Input.Responsive;

var email = "test" + Math.floor((Math.random().toString() * 100000) + 1) + '@webmdtv.com';
var youtube = "test" + Math.floor((Math.random().toString() * 100000) + 1) + '.net';
var name = "TEST";


describe('PPE-99104 UGC Data Entry Module', function () {
  /*before(function(){
   browser.windowHandleSize({width: 980, height: 691})
});*/

  function Fn(i) {

    it('Validation for Main Text with right Rail ad ' + Input.apps[i], function () {
      browser.url(Input.withrightad[i]);
      dataentrymodule = dataentry.ugcdataentry(youtube, name);
      dataentrymodule.maintext.should.equal(true);
      dataentrymodule.closebuttonnotvisible.should.equal(false);
     // dataentrymodule.invalidemail.should.containEql("Please enter a valid email");
      dataentrymodule.maintext.should.equal(true);
    //  dataentrymodule.textvalidation.should.equal("Help others find inspiration and guidance");
      dataentrymodule.closebuttonnotvisible.should.equal(false);
      //dataentrymodule.thankyoutext.should.containEql(name + ", THANK YOU FOR SHARING YOUR STORY");
      //dataentrymodule.thankyoufont.should.containEql("22");
    //  dataentrymodule.thankyoucolor.should.equal("#554c57");
      dataentrymodule.closebutton.should.equal(false);
    });
    it(' Please Enter valid email',function(){
dataentrymodule.invalidemail.should.containEql("Please enter a valid email");
    });
    it('Thank you message Va;lidation',function(){
dataentrymodule.thankyoutext.should.containEql(name + ", THANK YOU FOR SHARING YOUR STORY");
    });
      it('Thank you message Va;lidation',function(){
 dataentrymodule.thankyoufont.should.containEql("22");
    });
      it('Thank you message Va;lidation',function(){
dataentrymodule.thankyoucolor.should.equal("#554c57");
    });
    it('Validation for Help others find inspiration and guidance with right Rail ad ' + Input.apps[i], function () {
      dataentrymodule.textvalidation.should.equal("Help others find inspiration and guidance");
    });

    it('Validation for Email css validations for font color ' + Input.apps[i], function () {
      dataentrymodule.emailcss.fontColor.should.equal('#9b9b9b');
    });
    it('Validation for Email css validations for fontfamily with' + Input.apps[i], function () {
      dataentrymodule.emailcss.fontFamily.should.containEql('source sans pro');
    });
    it('Validation for Email css validations for font-size ' + Input.apps[i], function () {
      dataentrymodule.emailcss.fontSize.should.containEql('14');
    });
    it('Validation for closebutton css validations for font-color ' + Input.apps[i], function () {
      dataentrymodule.closebuttons.fontColor.should.equal('#222222');//should be #00000
    });
       it('Validation for closebutton css validations for height ' + Input.apps[i], function () {
      dataentrymodule.closebuttons.height.should.containEql('20');//should be #24.4px
    });
       it('Validation for closebutton css validations for width ' + Input.apps[i], function () {
      dataentrymodule.closebuttons.width.should.containEql('20');//should be #24.4px
    });

    it('verify required form fieds are marked * for ' + Input.apps[i], function () {

      dataentrymodule.requiredname.should.equal('*');//should be #00000
      console.log("req name" + dataentrymodule.requiredname);
      dataentrymodule.requiredemail.should.containEql('*');//should be #24.4px
      dataentrymodule.requiredcheckbox.should.containEql('*');//should be #24.4px

      dataentrymodule.requirednamecolor.fontColor.should.equal('#ec3b55');//should be f25568 displayed ec3b55
      dataentrymodule.requiredemailcolor.fontColor.should.containEql('#ec3b55');//should be f25568 displayed ec3b55
      dataentrymodule.requiredcheckboxcolor.fontColor.should.containEql('#ec3b55');//should be #24.4px
    });
    it('verify main text field kept blank and submission button selection for ' + Input.apps[i] + " is not enabled", function () {
      dataentrymodule.shareisenabled.should.equal(false);
    });

    it('verify Age fields allows the user to provide only positive numbers for ' + Input.apps[i], function () {
      dataentrymodule.entervalidage.should.containEql("Please enter a valid age");
    });

    it('verify maintext field with no text for ' + Input.apps[i], function () {
      dataentrymodule.enterstory.should.containEql("Please enter your story");
    });

    it('verify Name field accepts character data for ' + Input.apps[i], function () {
      dataentrymodule.invalidname.should.containEql("Please enter a valid name");
    });
    it('verify Phone number field for in valid number ' + Input.apps[i], function () {
      dataentrymodule.invalidnumber.should.containEql("Please enter a valid phone number");
    });

    it('verify Video url field for invalid url ' + Input.apps[i], function () {
      dataentrymodule.invalidvideourl.should.containEql("Please enter a valid web address");
    });

    it('verify color for input text entered for all the data fields font color ' + Input.apps[i], function () {
      dataentrymodule.namecssProperties.fontColor.should.equal("#358997");
      dataentrymodule.emailcssProperties.fontColor.should.equal("#358997");
      dataentrymodule.phonecssProperties.fontColor.should.equal("#358997");
      dataentrymodule.videourlcssProperties.fontColor.should.equal("#358997");


    });
     it('verify color for input text entered for all the data fields fontsize' + Input.apps[i], function () {

      dataentrymodule.namecssProperties.fontSize.should.containEql("20");
      dataentrymodule.emailcssProperties.fontSize.should.containEql("20");
      dataentrymodule.phonecssProperties.fontSize.should.containEql("20");
      dataentrymodule.videourlcssProperties.fontSize.should.containEql("20");
    });
     it('verify color for input text entered for all the data fields gender font size' + Input.apps[i], function () {

      dataentrymodule.gendercssproperties.fontSize.should.containEql("20");
      dataentrymodule.gendercssproperties.fontColor.should.containEql("#ffffff");
    });

     it('verify color for input text entered for all the data fields gender background color' + Input.apps[i], function () {
      dataentrymodule.genderboxcssproperties.backgroundcolor.should.containEql("#43b2c4");//displayed #43b2c4 as per mocks #02b8c2
    });
     it('verify color for input text entered for all the data fields email css font-color' + Input.apps[i], function () {
      dataentrymodule.emailcss.fontColor.should.equal('#9b9b9b');
      dataentrymodule.emailcss.fontFamily.should.containEql('source sans pro');
      dataentrymodule.emailcss.fontSize.should.containEql('14');
    });
  }
  for (var i = 0; i < rightad.length; i++) {
    Fn(i);
  }
});
