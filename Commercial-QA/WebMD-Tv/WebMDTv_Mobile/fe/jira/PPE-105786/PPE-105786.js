var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../../../common/elements/splashpageheader')
var functions = require('./../../../common/functions/Common_functions')
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.splash;


describe('WebMD TV Splash Page Header', function () {

    it('WebMD Logo', function () {
        browser.url(url);
        browser.pause(30000);
        browser.refresh();
        var logoheight = browser.getCssProperty(splashpage.header.Header_WebMDLogo, 'height');
        logoheight.value.should.containEql('30');
        var logowidth = browser.getCssProperty(splashpage.header.Header_WebMDLogo, 'width');
        logowidth.value.should.containEql('81');
        browser.click(splashpage.header.Header_WebMDLogo);
        var webmdurl = browser.getUrl();
        webmdurl.should.containEql('http://www.webmd.com/default.htm');
        browser.back();
        browser.pause(5000);

    });
    it('Present text below the WebMDlogo', function () {
        var presentsheight = browser.getCssProperty(splashpage.header.Header_WebMDLogo_presents, 'height');
        presentsheight.value.should.containEql('11');
        var presentswidth = browser.getCssProperty(splashpage.header.Header_WebMDLogo_presents, 'width');
        presentswidth.value.should.containEql('81');
        var presentsfontfamily = browser.getCssProperty(splashpage.header.Header_WebMDLogo_presents, 'font-family');
        presentsfontfamily.value.should.equal('roboto condensed');
        var presentsfontsize = browser.getCssProperty(splashpage.header.Header_WebMDLogo_presents, 'font-size');
        presentsfontsize.value.should.containEql('8');
        var presentscolor = browser.getCssProperty(splashpage.header.Header_WebMDLogo_presents, 'color');
        presentscolor.parsed.hex.should.equal('#ededed');


    });

    it('STAND UP TO text', function () {
        var standUptofontfamily = browser.getCssProperty(splashpage.header.Header_standUpto, 'font-family');
        standUptofontfamily.value.should.equal('source sans pro');
        var standUptofontsize = browser.getCssProperty(splashpage.header.Header_standUpto, 'font-size');
        standUptofontsize.value.should.containEql('30');
        var standUptocolor = browser.getCssProperty(splashpage.header.Header_standUpto, 'color');
        standUptocolor.parsed.hex.should.equal('#00f2ff');

    });

    it('MIGRAINE text', function () {
        var Migrainefontfamily = browser.getCssProperty(splashpage.header.Header_Migraines, 'font-family');
        Migrainefontfamily.value.should.equal('source sans pro');
        var Migrainefontsize = browser.getCssProperty(splashpage.header.Header_Migraines, 'font-size');
        Migrainefontsize.value.should.containEql('26');
        var Migrainecolor = browser.getCssProperty(splashpage.header.Header_Migraines, 'color');
        Migrainecolor.parsed.hex.should.equal('#ffffff');

    });

    it('Supported By text', function () {
        var sponsoredbyheight = browser.getCssProperty(splashpage.header.Header_sponsoredby, 'height');
        sponsoredbyheight.value.should.containEql('11');

        var sponsoredbywidth = browser.getCssProperty(splashpage.header.Header_sponsoredby, 'width');
        sponsoredbywidth.value.should.containEql('96');

        var sponsoredbyfontfamily = browser.getCssProperty(splashpage.header.Header_sponsoredby, 'font-family');
        sponsoredbyfontfamily.value.should.equal('roboto condensed');

        var sponsoredbyfontsize = browser.getCssProperty(splashpage.header.Header_sponsoredby, 'font-size');
        sponsoredbyfontsize.value.should.containEql('10')

        var sponsoredbycolor = browser.getCssProperty(splashpage.header.Header_sponsoredby, 'color');
        sponsoredbycolor.parsed.hex.should.containEql('#f0f0f0');

    });

    it('YOUR BRAND text', function () {

        var yourbrandfontfamily = browser.getCssProperty(splashpage.header.Header_yourbrand, 'font-family');
        yourbrandfontfamily.value.should.equal('source sans pro');

        var yourbrandfontsize = browser.getCssProperty(splashpage.header.Header_yourbrand, 'font-size');
        yourbrandfontsize.value.should.containEql('18');

        var yourbrandcolor = browser.getCssProperty(splashpage.header.Header_yourbrand, 'color');
        yourbrandcolor.parsed.hex.should.containEql('#f0f0f0');

    });
    it('Disclimar Block', function () {
        var disclaimerheight = browser.getCssProperty(splashpage.header.Header_disclaimer, 'height');
        disclaimerheight.value.should.containEql('35')

        var disclaimerwidth = browser.getCssProperty(splashpage.header.Header_disclaimer, 'width');
        disclaimerwidth.value.should.containEql('96')


    });

});
