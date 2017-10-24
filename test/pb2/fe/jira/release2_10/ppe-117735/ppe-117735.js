const test = require('./../../../../common/functions/functions');
const testdata = require('./../../../../data/testdata/ppe-117735.testdata');

var accessToken,response;

describe('PPE-117735', function() {
   it('Search the url with params and should not return chronicleid',function() {
       accessToken = test.GenerateApiAccessToken();
       response = test.searchurl(accessToken,testdata.urlwithparams)
       expect(response.Data).to.equal(null);
   })
    it('Search the url without params and should  return chronicleid',function() {
        accessToken = test.GenerateApiAccessToken();
       response = test.searchurl(accessToken,testdata.urlwithoutparams)
       expect(response.Data).to.not.equal(null);
   })
    it('Search the url with params and should  return chronicleid',function() {
        accessToken = test.GenerateApiAccessToken();
       response = test.searchbaseurl(accessToken,testdata.urlwithparams)
       expect(response.Data).to.not.equal(null);
   })
    it('Search the url without params and should  return chronicleid',function() {
        accessToken = test.GenerateApiAccessToken();
       response = test.searchbaseurl(accessToken,testdata.urlwithoutparams)
       expect(response.Data).to.not.equal(null);
   })
})