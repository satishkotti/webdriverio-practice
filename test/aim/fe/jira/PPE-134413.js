
const salestest = require('./../../common/functions/salesforce/functions');
const ttstest = require('./../../common/functions/ttsadmin/functions');
const aimtest = require('./../../common/functions/AIM/functions');
var webdriverio = require('webdriverio');
var should = require('should');


describe('login page for TTS', function () {

  it('Verify user is able to login in TTS Admin', function () {
    ttstest.LaunchApp();
    ttstest.Login();
    ttstest.Logout();
  });
   it('Verify user is able to login in sales force', function () {
    salestest.LaunchApp();
    salestest.Login();
    salestest.Logout();
  });
   it.only('Verify user is able to login in AIM', function () {
   aimtest.LaunchApp();
  });


});