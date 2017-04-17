describe('Dynamic Url', function () {

    var testUrl = "http://www.qa01.webmd.com";

    it('should load channel dynamic url PPE-#####', function () {
		browser.url(testUrl + '/allergies/news-features');
        browser.cookie('post', {
			name: 'nls2',
			value: '{%22a%22:0}'
		});

        expect(browser.getTitle()).to.be.equal('WebMD Allergies Health Center - Find allergy information and latest health news');
    });

    it('should load channel sub channel dynamic url PPE-#####', function () {
        browser.url(testUrl + '/skin-problems-and-treatments/eczema/news-features');
        browser.cookie('post', {
			name: 'nls2',
			value: '{%22a%22:0}'
		});
        expect(browser.getTitle()).to.be.equal('Eczema - Atopic Dermatitis - Center: Symptoms, Treatments, Causes, and Tests');
    });
	
});