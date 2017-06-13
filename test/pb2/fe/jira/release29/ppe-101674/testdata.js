
var testEnv = global.testEnv;
module.exports = {
    SetTestEnv: function(testEnvironemnt){
        testEnv =  this.testEnvironemnt;
    },
    UrlStartWithWWWEnvUrl: "www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*",
    correctEnvUrl: "http://www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking",
    correctEnvUrlWithWildcard: "http://www." + testEnv + ".webmd.com/food-recipes/guide/health-cooking*",
    validChronId:"091e9c5e8009e2d7",
    inValidChronId: "091e9c5e8009"
}