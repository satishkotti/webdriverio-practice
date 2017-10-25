const test = require('./../../../../common/functions/functions');
const testdata = require('./../../../../data/testdata/ppe-96474.testdata');

var accessToken,response;

describe('PPE-96474', function() {
     

   it('Search valid subdomain urls and should return chronicle id with SearchByFriendlyurl',function() {
       accessToken = test.GenerateApiAccessToken();
    var urls = testdata.subdomainurls;
     urls.forEach(function (asset) {
         var browseurl;
         var testUrl = asset.url.replace("$$LifeCycle$$", ".preview.");
         if (global.testEnv == "prodsea1") {
             browseurl = testUrl.replace("$$CoreDomain$$", "webmd.com")
         }
         else {
             browseurl = testUrl.replace("$$CoreDomain$$", "" + global.testEnv + ".webmd.com")
         }
         response = test.searchurl(accessToken, asset)
         expect(response.Data).to.not.equal(null);
     }, this);
   })
    it('Search valid subdomain urls and should return chronicle id with SearchByFriendlyurl',function() {
       accessToken = test.GenerateApiAccessToken();
    var urls = testdata.subdomainurls;
     urls.forEach(function (asset) {
         var browseurl;
         var testUrl = asset.url.replace("$$LifeCycle$$", ".preview.");
         if (global.testEnv == "prodsea1") {
             browseurl = testUrl.replace("$$CoreDomain$$", "webmd.com")
         }
         else {
             browseurl = testUrl.replace("$$CoreDomain$$", "" + global.testEnv + ".webmd.com")
         }
         response = test.searchbaseurl(accessToken, asset)
         expect(response.Data).to.not.equal(null);
     }, this);
   })
    
})