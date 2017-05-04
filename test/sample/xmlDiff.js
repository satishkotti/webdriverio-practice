var diff = require('deep-diff');
var Promise = require('bluebird');
var parseXml = require('./../common/xml/parseXml.js');

describe('Xml Diff Results', function () {

    var lhsUrl = 'http://ats.qa00.webmd.com/ATSFile.aspx?ID=091e9c5e806cee79';
    var rhsUrl = 'http://ats.qa01.webmd.com/ATSFile.aspx?ID=091e9c5e806cee79';

    var expectedChronicleId = '091e9c5e8001083d';
    var expectedAssetId = '091e9c5e812978bc';

    var lhsDataObj, rhsDataObj;

    it('Should not find diff for same content compare', function () {
            return Promise.resolve(parseXml.getXmlFromUrl(lhsUrl, null))
                .then(function (lhsResultObj){
                    lhsDataObj = lhsResultObj;
                    return parseXml.getXmlFromUrl(lhsUrl, null);
            }).then(function(rhsResultObj){
                rhsDataObj =rhsResultObj;
               var diffResults2 = diff(lhsDataObj, rhsResultObj);
               console.log(diffResults2);
                
            }).catch(err => { 
                    console.log(err);
                });
            });

    it('Xml get attribute and node values', function () {
            return Promise.resolve(parseXml.getXmlFromUrl(rhsUrl, null))
                .then(function (lhsResultObj){
                    lhsDataObj = lhsResultObj;
                    return parseXml.getXmlFromUrl(lhsUrl, null);
            }).then(function(rhsResultObj){
                rhsDataObj =rhsResultObj;
               var diffResults2 = diff(lhsDataObj, rhsResultObj);
               console.log(diffResults2);
                
            }).catch(err => { 
                    console.log(err);
                });
            });
});

