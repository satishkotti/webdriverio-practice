var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var S = require('string');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var input = require('./../../config/PPE-106378-Testdata')[argv.env];
var ar = require('./../../common/functions/PPE-106378.actions');
var url = input.environment;

describe('Verifying Popular Tools Module', function () {

    before(function () {
        browser.url(url);
    });
    it('Verify Popular Tools text is displayed', function () { 
        let PTdisplayed = ar.PopularTools('Popular Tools').isVisible();
        expect(PTdisplayed).to.be.true;

    });
    it('Verify Recipe Finder text is displayed', function () {
        let RFdisplayed = ar.PopularTools('Recipe Finder').isVisible();
        expect(RFdisplayed).to.be.true;

    });
    it('Verify Food Calorie Counter text is displayed', function () {
        let FCCdisplayed = ar.PopularTools('Food Calorie Counter').isVisible();
        expect(FCCdisplayed).to.be.true;

    });
    it('Verify Fitness Calorie Counter text is displayed', function () {
        let FICCdisplayed = ar.PopularTools('Fitness Calorie Counter').isVisible();
        expect(FICCdisplayed).to.be.true;

    });
    it('Verify Calcium Counter text is displayed', function () {
        let CCdisplayed = ar.PopularTools('Calcium Counter').isVisible();
        expect(CCdisplayed).to.be.true;

    });
    it('Verify Food & Fitness Planner text is displayed', function () {
        let FFPdisplayed = ar.PopularTools('Food & Fitness Planner').isVisible();
        expect(FFPdisplayed).to.be.true;

    });
    it('Verify Portion Size Plate text is displayed', function () {
        let PSPdisplayed = ar.PopularTools('Portion Size Plate').isVisible();
        expect(PSPdisplayed).to.be.true;

    });
    it('Verify BMI Calculator text is displayed', function () {
        let BMIdisplayed = ar.PopularTools('BMI Calculator').isVisible();
        expect(BMIdisplayed).to.be.true;

    });
    it('Verify Dietary Assesment text is displayed', function () {
        let DAdisplayed = ar.PopularTools('Dietary Assesment').isVisible();
        expect(DAdisplayed).to.be.true;

    });
});

