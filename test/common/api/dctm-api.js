var supertest = require('supertest-as-promised');
var server = supertest.agent('http://dmrest.' + global.testEnv + '.webmd.com/pbws/');

module.exports.SetAgent = function(agentBaseUrl){
    server = supertest.agent(agentBaseUrl);
}

module.exports.GenerateAccessToken = function () {

    return new Promise(function (resolve, reject) {
        server
            .post("dctm/auth/login")
            .set("Content-Type", "application/json")
            .send({
                "userName": "QAPublication",
                "repoName": "webmddoc01",
                "password": "QA-Doc#1"
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

module.exports.CreateAsset = function (accessToken, payload) {

    return new Promise(function (resolve, reject) {
        server
            .put("asset/save")
            .set("Content-Type", "application/json")
            .set("WBMD-USERNAME", global.username)
            .set("WBMD-REPOSITORY", global.doc)
            .set('WBMD-LOGIN-TICKET', accessToken)
            .set("Authorization", "bearer P8Z/0jXAhIFR8GfjDuiSmYgvjCKmReJ6mP34ZUqwGfAlR5v3")
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

module.exports.PublishAssetUsingApi = function (ticket, payload) {

    return new Promise(function (resolve, reject) {
        server
            .post("asset/publish")
            .set("Content-Type", "application/json")
            .set("WBMD-USERNAME", global.username)
            .set("WBMD-REPOSITORY", global.doc)
            .set('WBMD-LOGIN-TICKET', ticket)
            .set("Authorization", "bearer P8Z/0jXAhIFR8GfjDuiSmYgvjCKmReJ6mP34ZUqwGfAlR5v3")
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

module.exports.CheckoutAssetUsingApi = function (ticket, props) {

    var endpoint = 'asset/checkout/' + props.i_chronicle_id + '/' + props.r_object_id + '/' + props.asset_type + '?force=' + props.force;

    return new Promise(function (resolve, reject) {
        server
            .get(endpoint)
            .set("Content-Type", "application/json")
            .set("WBMD-USERNAME", global.username)
            .set("WBMD-REPOSITORY", global.doc)
            .set('WBMD-LOGIN-TICKET', ticket)
            .set("Authorization", "bearer P8Z/0jXAhIFR8GfjDuiSmYgvjCKmReJ6mP34ZUqwGfAlR5v3")
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

module.exports.ExecuteDQLUsingApi = function (ticket, dql) {

    return new Promise(function (resolve, reject) {
        server
            .post('dctm/dql/execute')
            .set("Content-Type", "application/json")
            .set("WBMD-USERNAME", "QAPublication")
            .set("WBMD-REPOSITORY", "webmddoc01")
            .set('WBMD-LOGIN-TICKET', ticket)
            .set("Authorization", "bearer P8Z/0jXAhIFR8GfjDuiSmYgvjCKmReJ6mP34ZUqwGfAlR5v3")
            .send({
                dql: dql
            })
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