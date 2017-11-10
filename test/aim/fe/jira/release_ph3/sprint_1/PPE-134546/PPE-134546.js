const salestest = require('./../../../../../common/functions/salesforce/functions');
const ttstest = require('./../..//../../../common/functions/ttsadmin/functions');
const aimtest = require('./../../../../../common/functions/AIM/functions');
const testdata = require('../../../../../data/testdata/ppe-134546.testdata');
const api = require('../../../../../../common/api/dctm-api');

describe('PPE-134546 Add Reservation for all HW Content to TTS Database', function () {

    let groupSearchData = null, fullurl= null;

    it('Verify user is able to search the urls status as reserved for the group', function () {

        ttstest.LaunchApp();
        ttstest.Login();
        ttstest.GroupSearch(testdata.testGroup);
         groupSearchData = ttstest.GetGroupSearchData(testdata.rowOne);
       fullurl =  groupSearchData.full_url;
         let actualurl =  fullurl.split("---",1);
 
        console.log("url:-" +actualurl);
      aimtest.LaunchApp();
      aimtest.UrlAdvSearch(actualurl);
      // aimtest.GetUrlData(testdata.rowOne);
    });

});