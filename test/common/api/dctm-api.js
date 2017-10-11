var supertest = require('supertest-as-promised');
var server = supertest.agent('http://dmrest.' + global.testEnv + '.webmd.com/pbws/');

module.exports.SetAgent = function (agentBaseUrl) {
    server = supertest.agent(agentBaseUrl);
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

module.exports.CreateAsset = function (accessToken, payload) {

    let iChronId = payload.i_chronicle_id;
    let rObjId = payload.r_object_id;

      let create = new Promise(function (resolve, reject) {
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
    });

    if([undefined, null, 'null', 'NULL', 'Null'].indexOf(iChronId) != -1)
    {
        return create;
    }
    else
    {
        let objName = payload.asset_metadata.object_name;
        let assetType = payload.r_object_type;
        if([undefined, null, 'null', 'NULL', 'Null'].indexOf(objName) != -1 && ['wbmd_pb_page', 'wbmd_pb_template', 'wbmd_pb_module', 'wbmd_pb_sharedmodule'].indexOf(assetType) != -1)
        {
            return new Promise(function(resolve, reject){
                return reject(
                    {
                        err: 'Cannot save existing asset without object_name property!'

                })
            })
        }

        else{
            return create;
        }
    }

  

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
            .set("WBMD-USERNAME", global.username)
            .set("WBMD-REPOSITORY", global.doc)
            .set('WBMD-LOGIN-TICKET', ticket)
            .set("Authorization", "bearer P8Z/0jXAhIFR8GfjDuiSmYgvjCKmReJ6mP34ZUqwGfAlR5v3")
            .send({
                'dql': dql
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
    });
}

module.exports.CheckoutAssetUsingApi = function (ticket, payload) {

    return new Promise(function (resolve, reject) {
        server
            .put('dctm/object/checkout')
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
    });

}

module.exports.ExpireAssetUsingApi = function (ticket, payload) {

    return new Promise(function (resolve, reject) {
        server
            .post('dctm/object/expire')
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
    });

}

module.exports.CancelCheckoutAssetUsingApi = function (ticket, payload) {

    return new Promise(function (resolve, reject) {
        server
            .post('dctm/object/cancelcheckout')
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
    });

}
