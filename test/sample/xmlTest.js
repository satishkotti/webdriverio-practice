var parseString = require('xml2js').parseString;
var Promise = require('bluebird');
var request = require('request');
var parseXml = require('./../common/xml/parseXml.js');
var JSONPath = require('JSONPath');

describe('Xml Data Parsing Tests', function () {

    var articleRenditionUrl = 'http://ats.qa00.webmd.com/ATSFile.aspx?ID=091e9c5e8001083d';
    var pageAtsRenditionUrl = 'http://ats.qa00.webmd.com/ATSFile.aspx?ID=091e9c5e8141c38f';

    var expectedChronicleId = '091e9c5e8001083d';
    var expectedAssetId = '091e9c5e812978bc';
    
    it('Should Get all modules with class name AdModule', function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(pageAtsRenditionUrl, null).then(function (result) {

                var adModules = JSONPath({json: result,  path: "$..[?(@.class === 'AdModule')]", resultType: 'all' }); //JSONPath syntax  https://www.npmjs.com/package/JSONPath

                expect(adModules.length).to.equal(4);
                expect(adModules[0].parent.$.chronic_id).to.equal('091e9c5e811bf587');
                expect(adModules[0].parent.$.path).to.equal('/webmd/PageBuilder_Assets/scopemaps/WebMD Consumer/Templates/Funded Flexible Layout Base Template_091e9c5e811bec4f/module_ad-banner_091e9c5e811bf587.wxml');
        }));
    });
    
      it('Should Get chronicle id', function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(articleRenditionUrl, null).then(function (result) {
                
                var expectedVal = result.webmd_rendition.content.wbmd_asset.metadata_section.i_chronicle_id;

                var adModules = JSONPath({json: result,  path: "$..i_chronicle_id", resultType: 'all' });
                
                expect(adModules.length).to.equal(1);
                expect(adModules[0].value).to.equal(expectedVal);
        }));
        });

    it('Xml get attribute and node values traversing object', function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(articleRenditionUrl, null).then(function (result) {
                    var assetId = result.webmd_rendition.content.wbmd_asset.$.id;
                    var cid = result.webmd_rendition.content.wbmd_asset.metadata_section.i_chronicle_id;
                expect(assetId).to.equal(expectedAssetId);
                expect(cid).to.equal(expectedChronicleId);
            }));
        });
});