var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {

    debug: true,
    specs: ['./test/d2/**.js'],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions:
        {
            //args: ['window-size=1920,1080']
            args:['start-maximized', 'disable-infobars']
        }
    }],

     before: function() {
        
        var chai = require('chai');
        chai.config.includeStack = true;
        expect = chai.expect;
        AssertionError = chai.AssertionError;
        Assertion = chai.Assertion;
        assert = chai.assert;
        should = chai.should();
        _ = require('lodash');

       var config = require('./test/d2/cons/config/config');
        global.envSettings = config.EnvSettings.getEnvSettings(testEnv);
        global.d2ConDataSettings = config.EnvSettings.getEnvData(testEnv);

    },

});