'use strict';
var assert = require('assert');
const Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), {
    multiArgs: true
});
var dctmApicaller = require("../common/dctmService");
var sharedModules = ["SharedModule1", "SharedModule2", "SharedModule3"];

var dctmLogin = function() {
    return new Promise(function(resolve, reject) {
        dctmService.login({
            callback: function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body.data.loginTicket);
                }
            }
        });
    });
};

var dctm = function(options) {
    return new Promise(function(resolve, reject) {
        dctmService.execute({
            uri: options.path,
            method: options.method,
            dmTickets: options.dmTicket,
            body: options.payload,
            callback: function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    body.dmticket = options.dmTicket;
                    resolve(body);
                }
            }
        })
    });
}


describe('Validate shared modules', function() {
    it('[Tool => SharedModule] Get from Dctm api', function() {

    });

    it('[Tool => SharedModule] validate matadata', function() {

    });

    it('[Tool => SharedModule] validate content', function() {

    });
});