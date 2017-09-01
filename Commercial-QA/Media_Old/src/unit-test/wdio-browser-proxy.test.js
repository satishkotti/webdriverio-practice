var q = require('q');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
//mock the browser object as we will not be loading the real wdio browser for unit tests
var browser = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
browser.addCommand = function (cmd, func) {
    browser[cmd] = func;
};
browser.on = function (cmd, func) {
    //need to wire up to end event
    eventEmitter.on(cmd, func);
}
browser.init = function (options) {
    return q.resolve('done');
}
browser.end = function () {
    eventEmitter.emit('end');
    return browser;
}
//mock the browsermob-proxy require that our module depends on
var proxyquire = require('proxyquire');
var homepage_networkcall = require('../../fixtures/webmdhomepage-networkcalls.json');
proxyquire('../../stub/proxyStub', {'../fixtures/networkData': homepage_networkcall });
var proxyStub = require('../../stub/proxyStub');
proxyquire('../../lib/wdio-browser-proxy', { 'browsermob-proxy': proxyStub });

var wdio_proxy = require('../../lib/wdio-browser-proxy')(browser);

describe('enableProxy test', function () {
    this.timeout(5000);
    it('should return some network traffic', function (done) {
        var test = browser
            .enableProxy()
            .then(function (brow) { console.log('done enabling proxy'); return brow; })
            .then(function (brow) { return brow.end(); })
            .then(function (brow) { console.log('in end callback'); var result = brow.getNetworkCalls('http://std.o.webmd.com'); return result; })
            .done(function(result) { result.length.should.be.above(0); done(); });
    });

});

describe('blacklist a url', function(){

    it('should set a blacklist call to the proxy', function(done){
        browser
            .addBlackList('http://www.google.com')
            .done(function(result){
                result.should.equal('blacklisted');
                done();
            });
    });
});

describe('set the host and port of the proxy', function(){
    var proxy = require('../../lib/wdio-browser-proxy')(browser, {host: 'myhost', port: 1234});

    it('should have the assigned host and port', function(){
        proxy.host.should.equal('myhost');
        proxy.port.should.equal(1234);
    });
});

describe('add a redirect for a url', function(){

    it('should set a redirect for a given url/regex of a url', function(done){
        browser
            .redirect('http://www.webmd.com', 'http://www.staging.webmd.com')
            .done(function(result){
                result.should.equal('redirected');
                done();
            });
    });

});

describe('whitelist a url', function(){

    it('should set a blacklist call to the proxy', function(done){
        browser
            .addWhiteList('http://www.google.com')
            .done(function(result){
                result.should.equal('whitelisted');
                done();
            });
    });
});