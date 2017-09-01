var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname);
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var mca = require('./../../../common/functions/MobileActions.js');
var Commonlocators = require('./../../../common/elements/Common.elements');
//var input = require('./../../../config/PPE-112347.testdata')[argv.env];
//var url = input.environment;

describe('Mobile Regression', function ()
 {
	browser.url('http://www.webmd.com/cold-and-flu/cold-guide/understanding-common-cold-basics');

	it('Verify Top Ad ', function (){
		var boolean = browser.isVisible(Commonlocators.topad.selector);
		boolean.should.be.equal(true);
	});

    it('Verify Bottom Ads ', function (){
       
        var pg = mca.getNumberOfPages();
		var ht = mca.getAllPageHeights(pg);
		mca.verifyAdsonAllPages(ht,pg)

	});	


    it('Verify ST Stack units ', function (){
       
        var pg = mca.getNumberOfPages();
		var ht = mca.getAllPageHeights(pg);
		mca.verifySTAds(ht,pg);

	});	

});
