var supertest = require('supertest-as-promised');
var server = supertest.agent('http://sma.dev01.webmd.com/api/');

module.exports.SetAgent = function (agentBaseUrl) {
    server = supertest.agent(agentBaseUrl);
}

module.exports.searchurl = function (ticket, payload) {

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

module.exports.GenerateAccessToken = function () {

    return new Promise(function (resolve, reject) {
        server
            .post("dctm/auth/login")
            .set("Content-Type", "application/json")
            .send({
                "userName": global.username,
                "repoName": global.doc,
                "password": global.password
            })
            .expect(200, (err, res) => {
                if (err)
                    return reject(
                        {
                            error: err,
                            response: res.body
                        });
                else
                    return resolve(res.body);
            })

    });
}
