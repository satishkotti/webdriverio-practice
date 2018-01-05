var supertest = require('supertest-as-promised');
var server = null;
module.exports.SetAgent = function (agentBaseUrl) {
    server = supertest.agent(agentBaseUrl);
}
module.exports.Get = function (queryString) {
    return new Promise(function (resolve, reject) {
        server
            .get(queryString)
            .expect(200, function (err, res) {
                if (!err && res.body) {
                    return resolve(res.body);
                }
                else {
                    return reject(
                        {
                            error: err,
                            response: res.body
                        });
                }
            });
    })

}