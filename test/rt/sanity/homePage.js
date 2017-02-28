describe("Home Page", function(){

	var testUrl = "http://www.webmd.com";

	 before(function() {

		browser.url(testUrl);
			 
		browser.cookie('post', {
			name: 'nls2',
			value: '{%22a%22:0}'
		});

    });

	it('should load successfully', function () {
		var title = browser.getTitle();
		var url = browser.getUrl();

		expect(title).to.equal('WebMD - Better information. Better health.');
		expect(url).to.equal(testUrl + '/');
    });

	it('should load social sharing tags', function () {

		expect(browser.isExisting("meta[property='fb:pages'][content='11736558481']")).to.be.true;
		expect(browser.isExisting("meta[property='fb:app_id'][content='385978254785998']")).to.be.true;
		expect(browser.isExisting("meta[property='og:title'][content='WebMD - Better information. Better health.']")).to.be.true;
    });
});