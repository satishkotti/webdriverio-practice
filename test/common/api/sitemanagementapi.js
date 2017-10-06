var supertest = require('supertest-as-promised');
var server = supertest.agent('http://sma.' + global.testEnv +'.webmd.com/api/');

module.exports.SetAgent = function (agentBaseUrl) {
    server = supertest.agent(agentBaseUrl);
}

module.exports.searchurl = function (ticket,payload) {

    return new Promise(function (resolve, reject) {
        server
            .post("manager/SearchByFriendlyUrl")
            .set("Content-Type", "application/json")
             .set("WBMD-USERNAME", global.username)
            .set("WBMD-REPOSITORY", global.doc)
            .set('WBMD-LOGIN-TICKET', ticket)
            .set("Authorization", "123456")
            .send(payload)
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


