var request = require('request');
var Promise = require('bluebird');
var rp = require('request-promise');
var fs = require('fs');
var path = require('path');
var usersDetails = require('./../../../pb2/config/users');
var smTestData = require('./../../config/api.config');

var USERNAME = usersDetails.users.superuser1.username;
var testAssetProps = smTestData.ApiTestData;
var testurl=global.testapiurl
var jsonData = {};


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


    switch (url) {
        case testurl + testAssetProps.Create_Redirect_on_Urls: jsonData =  testAssetProps.CreateRedirectonUrls; break;
       case testurl + testAssetProps.Create_Redirect_on_ChronicleIDS: jsonData = testAssetProps.CreateRedirectonChronicleIDS; break;
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
 
    switch (url) {
        case testurl + testAssetProps.Update_To_Url: jsonData = testAssetProps.updatetourl; break;
        case testurl + testAssetProps.Replace_To_ChronicleID_for_All: jsonData = testAssetProps.replacetochronicleidforall; break;
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


    switch (url) {
        case testurl + testAssetProps.Delete_One_or_more: jsonData = testAssetProps.DeleteOneormoreid; break;

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