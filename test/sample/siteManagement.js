var Promise = require('bluebird');
var request = require('request');
var smdb = require('./../common/smdb/siteManagementDb');

describe('Site Management DB Sample Test', function () {
    
    it('Should get node info from site management db', function () {
            return Promise.resolve(
                smdb.getSiteVieMapNodeInfo(1031, 1).then(function (resultset) {
               
                var expectCQ = '<AssetQuery><QueryFields/></AssetQuery>';
                var expectDisplayName = 'Level 0';
                var expectScopeMapNodeId = '1032';

                /*
                resultset.forEach(function (val) {
                    console.log(val);
                })
                ;*/

                var smnDisplay = resultset[0].ScopemapDisplayName;
                var smnNodeId = resultset[0].ScopeMapNodeId;
                var cq = resultset[0].ContentQuery;

                expect(smnDisplay).to.equal(expectDisplayName);
                expect(smnNodeId).to.equal(expectScopeMapNodeId);
                expect(cq).to.equal(expectCQ);
            }));
        });
});