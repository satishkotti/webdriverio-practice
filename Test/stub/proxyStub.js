//this is a stub to be used in place of browsermob-proxy module so we don't need to actually run the proxy
var networkData = require('../fixtures/networkData');   //this points to default but if your test needs something specific proxyquire this and change it

function Proxy(options) {

    //var _networkResponse = options.networkcalls || {};
    var host, port;
    host = (options && options.host) || 'localhost';
    port = (options && options.port) || 8080;

    function start(port, func) {
        func(null, { port: 1234 });
    }

    function startHAR(port, name, header, content, binaryContent, func) {
        func(null, '');
    }

    function getHAR(port, func) {
        func(null, JSON.stringify(networkData));
    }

    function stop(port, func) {
        func();
    }

    function setNetworkData(data) {

    }

    function doReq(method, url, postData, cb) {
        cb(null, "");
        
    }

    return {
        start: start,
        startHAR: startHAR,
        getHAR: getHAR,
        stop: stop,
        setNetworkData: setNetworkData,
        doReq: doReq,
        host: host,
        port: port
    }
}

module.exports = { 
    Proxy : Proxy
};