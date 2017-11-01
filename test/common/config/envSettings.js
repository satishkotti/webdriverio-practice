var config = require("./config.js")
var JSONPath = require('JSONPath');

module.exports = {
    env: "qa00",

    getConfig: function () 
    {
        var settings = JSONPath(
            {
                json: config,
                path: (this.env),
                resultType: 'all'
            });

        return settings[0].value;
    }
}