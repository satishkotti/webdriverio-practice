var request = require('request');
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var USERNAME ='QAPbUser09';


var CreateRedirectonUrls = {
    fromUrl: 'http://www.dev01.webmd.com/cancer/features/cancer-living-with-talking-to-your-kids-about-cancer',
    toUrl: 'http://www.cancercenter.com/cancer/'
};


var CreateRedirectonChronicleIDS = {
    fromChronID: '091e9c5e80038eb2',
    toChronID: '091e9c5e80044d75'
}

var updatetourl = {
    id: 'C35FFC22-5469-40EB-94AF-85E057629692',
    toUrl: 'http://www.cancercenter.com/cancer/'
};

var replacetochronicleidforall = {
    oldToChronicleID: '091e9c5e80005962',
    newToChronicleID: '091e9c5e80038ec9'
};



var DeleteOneormoreid = {
   
       Ids:['2D79A320-04B0-43B9-A77D-A8946AEAF4B4', '5EC133C0-3AF4-4B71-97DA-DA01D59A5548']
   
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