const salestest = require('./../../../../../common/functions/salesforce/functions');
const ttstest = require('./../..//../../../common/functions/ttsadmin/functions');
const aimtest = require('./../../../../../common/functions/AIM/functions');
const testdata = require('../../../../../data/testdata/ppe-134546.testdata');
const api = require('../../../../../../common/api/dctm-api');

describe('PPE-134546 Add Reservation for all HW Content to TTS Database', function () {

  let groupSearchData = null, fullurl = null, Aimurldata = null,collGroupSearchData;

  before(function () {
    ttstest.LaunchApp();
    ttstest.Login();
    ttstest.GroupSearch(testdata.testGroup);
    groupSearchData = ttstest.GetGroupSearchData(testdata.rowOne);
    groupSearchData.status.should.equal('Reserved'); //  verfying group status ie Reserved
    console.log("group -" + groupSearchData.status);
    fullurl = groupSearchData.full_url;
    let actualurl = fullurl.split("---", 1);
    console.log("url:-" + actualurl);    
    aimtest.LaunchApp();
    aimtest.UrlAdvSearch(actualurl);
    Aimurldata = aimtest.GetUrlData(testdata.rowOne);
    
  }) 

  it('Verify user is able to search the urls status as reserved in TTS for the group  and Yes - TTS in AIM  ', function () {
  
    Aimurldata.reservation.should.equal('Yes - TTS'); //  verifying Reservation status ie Yes - TTS
   
  });
  it('Verify user is able to see collison for already added to an exiting group ', function () {
  
      ttstest.LaunchApp();
  browser.pause(2000);
    ttstest.GroupSearch(testdata.collisiongroup);
    collGroupSearchData = ttstest.GetGroupSearchData(testdata.rowOne);
      browser.pause(2000);
     collGroupSearchData.restriction_collision.should.equal('Collision'); //  verfying url has collision as same url is associated existing group
  collGroupSearchData.restriction_group.should.equal('10516'); //  verfying url has collision with existing group

  }); 





});