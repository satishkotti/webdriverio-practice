var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;

describe('Overlay Ad', function () {

        before(function () {
                browser.url("https://www.staging.webmd.com/diabetes/features/diabetes-treatment-trends");
                this.timeout(0);
        });

        it('Verify the Overlay Ad when the HTTPS URL is browsed', function () {

        browser.frame('_mN_advBid_rtbscache');
        var b = browser.isVisible("#webmdHoverContent");
        b.should.be.equal(true);

        });

});