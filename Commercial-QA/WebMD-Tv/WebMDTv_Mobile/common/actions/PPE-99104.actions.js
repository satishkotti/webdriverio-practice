var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var dataentrymodule = require('./../elements/WebMDtv');
var functions = require('./../functions/Common_functions');
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.splash;
var email = 'testinvalid';
var dataentry = {};



module.exports = {
  ugcdataentry: function (youtube, name) {
    browser.pause(1000);
    browser.scroll("//div[@class='form-wrap']//div[@class='field']//textarea");
    browser.pause(2000);

    dataentry.maintext = browser.isExisting("//div[@class='form-wrap']//div[@class='field']//textarea");
    dataentry.closebuttonnotvisible = functions.is_Visible(dataentrymodule.shareclosebutton);
    browser.click("//div[@class='form-wrap']//div[@class='field']//textarea");
    browser.pause(1000);

    //Email code
    browser.scroll("//div[@class='field text website']//input[@id='ugc-website']");
    dataentry.emailcss = functions.cssProperties(dataentrymodule.emailtext);
    
    dataentry.emailtexts = functions.get_Text(dataentrymodule.emailtext);
    dataentry.requiredname = functions.get_Text(dataentrymodule.namerequired);
    dataentry.requiredemail = functions.get_Text(dataentrymodule.emailrequired);
   
   //Required and check box code
    dataentry.requiredcheckbox = functions.get_Text(dataentrymodule.checkboxrequired);
    dataentry.requirednamecolor = functions.cssProperties(dataentrymodule.namerequired);
    dataentry.requiredemailcolor = functions.cssProperties(dataentrymodule.emailrequired);
    dataentry.requiredcheckboxcolor = functions.cssProperties(dataentrymodule.checkboxrequired);

    //Data Entry of values
    dataentry.shareisenabled = dataentrymodule.share.isEnabled();
    dataentrymodule.name.setValue(name);
    dataentrymodule.email.setValue('subbu@ymail.com');
    dataentrymodule.checkbox.click();
    dataentrymodule.share.click();
    dataentry.enterstory = browser.alertText();
    browser.alertAccept();
    dataentrymodule.maintextarea.setValue("test share");
    dataentrymodule.gender.click();

    //Gender Validations
    dataentry.gendercssproperties = functions.cssProperties(dataentrymodule.gender);
    dataentry.genderboxcssproperties = functions.cssProperties(dataentrymodule.gender);
    dataentry.closebuttons = functions.cssProperties(dataentrymodule.shareclosebutton);

    //Age Values
    dataentrymodule.youtube.setValue(youtube);
    dataentrymodule.age.setValue("-26");
    dataentrymodule.share.click();
    dataentry.entervalidage = browser.alertText();
    browser.alertAccept();
    dataentrymodule.clearage.clearElement();
    dataentrymodule.clearage.setValue("26");
    dataentrymodule.clearemail.clearElement();
    browser.pause(500);
    dataentrymodule.clearemail.setValue(email);

    //Condition validation for Incorrect email
if (email == 'testinvalid') {
      dataentrymodule.share.click();
      dataentry.invalidemail = browser.alertText();
      browser.alertAccept();
      dataentrymodule.clearemail.clearElement();
      dataentrymodule.clearemail.setValue('subbu@ymail.com');

      //Incorrect mobile Number
      dataentrymodule.phone.setValue('95819069202');
      dataentrymodule.share.click();
      dataentry.invalidnumber = browser.alertText();
      browser.alertAccept();
      dataentrymodule.clearphone.clearElement();
      dataentrymodule.clearphone.setValue('9581906920');
      dataentrymodule.clearyoutube.clearElement();

      //Invalid Video url
      dataentrymodule.clearyoutube.setValue('invalidvideourl');
      dataentrymodule.share.click();
      dataentry.invalidvideourl = browser.alertText();
      browser.alertAccept();
      dataentrymodule.clearyoutube.clearElement();
      dataentrymodule.clearyoutube.setValue('youtube.net');
      dataentrymodule.clearname.clearElement();
      dataentrymodule.clearname.setValue('stirumuneedi63');
      dataentrymodule.share.click();
      dataentry.invalidname = browser.alertText();
      browser.alertAccept();

      //Css Properties validations for Name
      dataentrymodule.clearname.clearElement();
      dataentrymodule.clearname.setValue('TEST');
      dataentry.namecssProperties = functions.cssProperties(dataentrymodule.clearname);
      dataentry.emailcssProperties = functions.cssProperties(dataentrymodule.clearemail);
      dataentry.phonecssProperties = functions.cssProperties(dataentrymodule.clearphone);
      dataentry.videourlcssProperties = functions.cssProperties(dataentrymodule.clearyoutube);
      dataentrymodule.share.click();
      dataentry.thankyoutext = dataentrymodule.thankyou.getText();
      dataentry.thankyoufont = functions.get_cssValue(dataentrymodule.thankyou, 'font-size');
      dataentry.thankyoucolor = functions.get_cssValue(dataentrymodule.thankyou, 'color');
      dataentry.closebutton = functions.is_Visible(dataentrymodule.shareclosebutton);
    }
     else {

       //Capturing of thankyou CSS properties
      dataentry.thankyoutext = dataentrymodule.thankyou.getText();
      dataentry.thankyoufont = functions.get_cssValue(dataentrymodule.thankyou, 'font-size');
      dataentry.thankyoucolor = functions.get_cssValue(dataentrymodule.thankyou, 'color');
      dataentry.closebutton = functions.is_Visible(dataentrymodule.shareclosebutton);

    }
    return dataentry;
  }

}
