var xml2js = require('xml2js');
var request = require('request');
var Promise = require('bluebird');

function ParseXml() { }

ParseXml.prototype.getXmlFromUrl = function getXmlFromUrl(url, options) {
    return new Promise(function (resolve, reject) {
        if (options !== 'undefined') {
            options = {
                method: "GET",
                url: url,
                json: false
            };
        }
        try {
            request.get(url, options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var parser = new xml2js.Parser({ explicitArray: false });
                    parser.parseString(body, function (err, result) {
                        if (!err && result !== '') {
                            resolve(result);
                        }
                        else {
                            reject(err);
                        }
                    });
                } else
                    reject(err);
            })
        } catch (error) {
            console.log('getXmlFromUrl' + error);
            reject(error);
        }
    });
};

module.exports = new ParseXml();