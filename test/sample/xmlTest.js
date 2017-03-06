var parseString = require('xml2js').parseString;
var Promise = require('bluebird');
var request = require('request');
var parseXml = require('./../common/xml/parseXml.js');

describe('Xml Test', function () {

    var testUrl = 'http://ats.qa00.webmd.com/ATSFile.aspx?ID=091e9c5e8001083d';

    var expectedChronicleId = '091e9c5e8001083d';
    var expectedAssetId = '091e9c5e812978bc';
    
    it('Xml get attribute and node values', function () {
            return Promise.resolve(
                parseXml.getXmlFromUrl(testUrl, null).then(function (result) {
                    var assetId = result.webmd_rendition.content[0].wbmd_asset[0].$.id;
                    var cid = result.webmd_rendition.content[0].wbmd_asset[0].metadata_section[0].i_chronicle_id[0];
                expect(assetId).to.equal(expectedAssetId);
                expect(cid).to.equal(expectedChronicleId);
            }));
        });
});