var Promise = require('bluebird');
var request = require('request');
var smdb = require('./../common/siteManagementDb.js');

describe('Xml Test', function () {
    
    it('Should get node info from site management db', function () {
            return Promise.resolve(
                smdb.getSiteVieMapNodeInfo(16271, 1).then(function (resultset) {
                   
                    resultset.forEach(function(value){ 
                     console.log(value); 
                    });
            }));
        });
});