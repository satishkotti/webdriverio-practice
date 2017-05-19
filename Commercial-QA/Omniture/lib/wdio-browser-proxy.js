var Proxy = require('browsermob-proxy').Proxy;
var q = require('q');
var _ = require('lodash');

function BrowserProxy(browser, options) {
    //check to see if options were passed
    var proxy;
    if (options) {
        proxy = new Proxy(options);
    } else {
        proxy = new Proxy();
    }
    var _browser = browser;
    var _port;  //this is the current proxy port
    var _networkData;   //this is the current network traffic data

    //add the new commands
    _browser.addCommand('enableProxy', function async(options) {
        if (!options)
            options = {};   //default the options if not passed in
        var deferred = q.defer();
        console.log('enabling proxy');
        _networkData = {}; //reset the data whenever someone enables the proxy

        //start the proxy
        var port = options.proxyPort || proxy.proxyPort;
        if (typeof options === 'string') {
            options = { name: options };
        }
        proxy.start(port, function (err, data) {
            _port = data.port;
            console.log('start proxy');
            if (!err) {
                proxy.startHAR(data.port, options.name, options.captureHeaders, options.captureContent, options.captureBinaryContent, function (err, resp) {
                    console.log('proxy startHAR');
                    if (!err) {
                        _browser
                            .init({
                                browserName: browser.desiredCapabilities.browserName,
                                seleniumProtocol: 'WebDriver',
                                proxy: {
                                    httpProxy: proxy.host + ':' + data.port,
                                    proxyType: 'manual',
                                    sslProxy: proxy.host + ':' + data.port
                                }
                            })
                            .then(function () {
                                console.log('browser has been initialized');
                                //deferred.resolve('browser initialized with proxy');
                                deferred.resolve(_browser);
                            });
                    } else {
                        deferred.reject(err);
                        proxy.stop(data.port, function () { });
                    }
                });
            } else {
                deferred.reject(err);
                console.log('error starting proxy');
            }
        });

        return deferred.promise;
    });

    //when the end call is made on the browser capture the HAR
    _browser.on('end', function () {
        var deferred = q.defer();
        proxy.getHAR(_port, function (err, resp) {
            console.log('proxy getHAR');
            if (err) {
                deferred.reject(err);
            } else {
                console.log('captured network data')
                _networkData = JSON.parse(resp);
                deferred.resolve('captured HAR')
            }
            proxy.stop(_port, function () {
                //stop the proxy, do not need to wait for this
            });
        });
        return deferred.promise;
    });

    //add command to get networkdata entries that match a given url
    _browser.addCommand('getNetworkCalls', function (url) {
        console.log('getting requested networkcalls');
        data = _.filter(_networkData.log.entries, function (o) {
            return _.startsWith(o.request.url, url);
        });
        return data;
    });

    //this command will return 404 for any urls that are given to it, it takes a url regular express
    _browser.addCommand('addBlackList', function async(url) {
        var deferred = q.defer();
        var postData = "regex=" + url + "&status=404";

        proxy.doReq('PUT', '/proxy/' + _port + '/blacklist', postData, function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve('blacklisted');
            }
        });
        return deferred.promise;
    });

    return proxy;
}

module.exports = BrowserProxy;