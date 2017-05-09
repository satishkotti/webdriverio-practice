//”./test/specs/spec.js”

describe("Sample Spec", function() {
	it('webdriver.io: should be able to filter for commands', function () {
        browser.url('http://webdriver.io/api.html');
        // filtering property commands
		$('.searchbar input').setValue('getT');

        // get all results that are displayed and click the link with text getTagName
		browser.elements('.command.property').click('a=getTagName');
        expect($('.doc h1').getText()).to.be.equal('GETTAGNAME');
    });

    it("Test webmd.com title", function() {
      browser.url('http://www.webmd.com');
      var url = browser.getUrl();// returns the served page URL - can be the requested URL or the error page URL
      expect(url).to.equal('http://www.webmd.com/');
    });
}) ;
