var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var argv = require("yargs").argv;
var splashpage = require('./../../../common/elements/splashpage')
var grid = require('./../../../common/actions/PPE-99100.actions');
var Input = require('./../../../config/Webmd-tv')[argv.env];
var url = Input.splash;
var gridvalidation;


describe('Splash Page Validations', function () {

    browser.url(url);
    it('Validation for videos Grid', function () {
        gridvalidation = grid.grid();
        gridvalidation.playbutton.height.should.containEql('30');
        gridvalidation.playbutton.width.should.containEql('30');
        gridvalidation.playbutton.fontColor.should.containEql('#ffffff');

    });
    it('Validation for text in the Grid', function () {
        gridvalidation.text.fontColor.should.containEql('#f2eef3');
        gridvalidation.text.fontFamily.should.containEql('source sans pro');
        gridvalidation.text.fontSize.should.containEql('14');
    });
    it('Validation for episode in the Grid', function () {
        gridvalidation.eposide.fontColor.should.containEql('#13e9f4');
        gridvalidation.eposide.fontFamily.should.containEql('source sans pro');
        gridvalidation.eposide.fontSize.should.containEql('10');
        gridvalidation.eposidetext.should.containEql('EPISODE');
    });

    it('Validation for overlay in the Grid', function () {
        gridvalidation.overlay.height.should.containEql('162');
        gridvalidation.overlay.width.should.containEql('71');

    });

    it('Validation for grid', function () {
        //grid1.height.should.containEql('193');
        gridvalidation.grid1.width.should.containEql('340');
    });


    it('Validation for Quote in the Grid', function () {
        gridvalidation.onlyquote.fontColor.should.containEql('#ebe1dc');
        gridvalidation.onlyquote.fontFamily.should.containEql('source sans pro');
        gridvalidation.onlyquote.fontSize.should.containEql('20');
    });
    it('Validation for Author in the Grid', function () {
        gridvalidation.Author.fontColor.should.containEql('#f2eef3');
        gridvalidation.Author.fontFamily.should.containEql('source sans pro');
        gridvalidation.Author.fontSize.should.containEql('20');
    });

    it('Validation for authorcity in the Grid', function () {

        gridvalidation.authorcity.fontColor.should.containEql('#f2eef3');
        gridvalidation.authorcity.fontFamily.should.containEql('source sans pro');
        gridvalidation.authorcity.fontSize.should.containEql('14');
    });
    it('Validation for authorstate in the Grid', function () {

        gridvalidation.authorstate.fontColor.should.containEql('#f2eef3');
        gridvalidation.authorstate.fontFamily.should.containEql('source sans pro');
        gridvalidation.authorstate.fontSize.should.containEql('14');
    });

    it('Validation for blueline in the Grid', function () {

        gridvalidation.bluelinecolor.height.should.containEql('2');

        gridvalidation.lineheight.should.containEql('2')

    });

    it('Validation for bottombluelinecolor in the Grid', function () {

        gridvalidation.bottombluelinecolor.height.should.containEql('1');

    });

    it('Validation for sponsored in the Grid', function () {
        gridvalidation.sponsored.fontColor.should.containEql('#ea480a');
        gridvalidation.sponsored.fontFamily.should.containEql('roboto condensed');
        gridvalidation.sponsored.fontSize.should.containEql('10');

    });
});
