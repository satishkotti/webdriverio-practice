var request = require('request');
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var USERNAME ='QAPbUser09';


var CreateRedirectonUrls = {
    fromUrl: 'http://www.dev01.webmd.com/diet/features/nutrition-news-got-confused-get-facts',
    toUrl: 'http://www.webmd.com'
};


var CreateRedirectonChronicleIDS = {
    fromChronID: '091e9c5e80038e7a',
    toChronID: '091e9c5e80038e62'
}

var updatetourl = {
    id: 'C35FFC22-5469-40EB-94AF-85E057629692',
    toUrl: 'http://www.webmd.com'
};

var replacetochronicleidforall = {
    oldToChronicleID: '091e9c5e8000596a',
    newToChronicleID: '091e9c5e80005968'
};



var DeleteOneormoreid = {
   
       Ids:['C35FFC22-5469-40EB-94AF-85E057629692', 'D611DF56-4711-425C-A918-D2F7DE7C9FAD']
   
};

function Redirectapi() { }

Redirectapi.prototype.GetResultsApi = function GetResultsApi(url, options) {
    return new Promise(function (resolve, reject) {
        if (options !== 'undefined') {
            options = {
                method: "GET",
                url: url,
                json: true,
                timeout: 900000,
                headers: {
                    'WBMD-USERNAME': USERNAME,
                    "Content-Type": 'application/json utf-8'

                }

            };
        }
        try {
            request.get(url, options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(response);

                } else
                    reject(err);
            })

        }
        catch (error) {
            console.log('Redirectapi' + error);
            reject(error);
        }
    });
};


Redirectapi.prototype.PostResultsApi = function PostResultsApi(url, options) {

    var jsonData = {};

    switch (url) {
        case 'http://redirect.dev01.webmd.com/api/redirect/create-by-url': jsonData = CreateRedirectonUrls; break;
        case 'http://redirect.dev01.webmd.com/api/redirect/create-by-ids': jsonData = CreateRedirectonChronicleIDS; break;
    }

    return new Promise(function (resolve, reject) {
        if (options !== 'undefined') {
            options = {
                method: "POST",
                url: url,
                json: true,
                body: jsonData,
                headers: {
                    'WBMD-USERNAME': USERNAME,
                    "Content-Type": 'application/json'

                }

            };
        }
        try {
            request.post(url, options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(response);

                } else
                    reject(err);
            })

        }
        catch (error) {
            console.log('Redirectapi' + error);
            reject(error);
        }
    });
};

Redirectapi.prototype.PutResultsApi = function PutResultsApi(url, options) {

    var jsonData = {};

    switch (url) {
        case 'http://redirect.dev01.webmd.com/api/redirect/update-to-url': jsonData = updatetourl; break;
        case 'http://redirect.dev01.webmd.com/api/redirect/replace-to-chronicle-id-for-all': jsonData = replacetochronicleidforall; break;
    }

    return new Promise(function (resolve, reject) {
        if (options !== 'undefined') {
            options = {
                method: "PUT",
                url: url,
                json: true,
                body: jsonData,
                headers: {
                    'WBMD-USERNAME': USERNAME,
                    "Content-Type": 'application/json'

                }

            };
        }
        try {
            request.put(url, options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(response);

                } else
                    reject(err);
            })

        }
        catch (error) {
            console.log('Redirectapi' + error);
            reject(error);
        }
    });
};

Redirectapi.prototype.DeleteResultsApi = function DeleteResultsApi(url, options) {

    var jsonData = {};

    switch (url) {
        case 'http://redirect.dev01.webmd.com/api/redirect/delete-many-by-id': jsonData = DeleteOneormoreid; break;
        
    }

    return new Promise(function (resolve, reject) {
        if (options !== 'undefined') {
            options = {
                method: "DELETE",
                url: url,
                json: true,
                body: jsonData,
                headers: {
                    'WBMD-USERNAME': USERNAME,
                    "Content-Type": 'application/json'

                }

            };
        }
        try {
            request.delete(url, options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(response);

                } else
                    reject(err);
            })

        }
        catch (error) {
            console.log('Redirectapi' + error);
            reject(error);
        }
    });
};

module.exports = new Redirectapi();