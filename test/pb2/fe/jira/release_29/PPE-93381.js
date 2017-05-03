var assert = require('assert');
const Promise = require('bluebird');
var testEnv = global.testEnv;
var dctmService = require("./../../../../common/dctmService");
var fs = require("fs");
var parse = require('csv-parse');
var folderPath = 'test/pb2/fe/jira/release_29/files-for-PPE-93381';
var readFolder = function(folder) {
    return new Promise(function(resolve, reject) {
        fs.readdir(folder, function(err, files) {
            if (err) reject(err);
            else resolve(files);
        });
    });
}

var dctmLogin = function() {
    return new Promise(function(resolve, reject) {
        dctmService.login({
            callback: function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body.data.loginTicket);
                }
            }
        });
    });
};

///{
///     dmTickets : dm dmTickets,
///     method : POST, GET...,
///     path: end point path ,
///     payload: dctm api payload 
///}
var dctm = function(options) {
    return new Promise(function(resolve, reject) {
        dctmService.execute({
            uri: options.path,
            method: options.method,
            dmTickets: options.dmTicket,
            body: options.payload,
            callback: function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    body.dmticket = options.dmTicket;
                    resolve(body);
                }
            }
        })
    });
}
describe('PPE-93381: Script/API creation of Links List Modules', function() {
    var csvFiles = null;
    var csvModules = new Array();
    var moduleWithDctmData = new Array();

    before(() => {
        return Promise.resolve(
            readFolder(folderPath).then(function(files) {
                csvFiles = files;
            }));
    });

    it('Read the csv files', function() {
        csvFiles.forEach(file => {
            var csvData = [];
            var module = {};
            var links = [];
            fs.createReadStream(folderPath + "/" + file)
                .pipe(parse({ delimiter: ',' }))
                .on('data', function(csvrow) {

                    switch (csvrow[0]) {
                        case "Site":
                            module.Site = csvrow[1];
                            break;
                        case "Module Name":
                            module.ModuleName = csvrow[1];
                            break;
                        case "Module Display Name":
                            module.ModuleDisplayName = csvrow[1];
                            break;
                        case "Category":
                            module.Category = csvrow[1];
                            break;
                        case "XSL":
                            module.XSL = csvrow[1];
                            break;
                        case "CSS":
                            module.CSS = csvrow[1];
                            break;
                        case "Module Label 1":
                            module.ModuleLabel1 = csvrow[1];
                            break;
                        case "Module Label 2":
                            module.ModuleLabel2 = csvrow[1];
                            break;
                        case "Description":
                            module.Description = csvrow[1];
                            break;
                        case "Sponsor Program":
                            module.SponsorProgram = csvrow[1];
                            break;
                        case "Linked Module":
                            module.LinkedModule = csvrow[1];
                            break;
                        case "Tier":
                            module.Tier = csvrow[1];
                            break;
                        case "Conf_Module Title":
                            links.push({
                                title: csvrow[1],
                                id: csvrow[2],
                                type: "Title"
                            });
                            break;
                        case "Conf_Emphasized":
                            links.push({
                                title: csvrow[1],
                                id: csvrow[2],
                                type: "Emphasized"
                            });
                            break;
                        case "Conf_Link":
                            links.push({
                                title: csvrow[1],
                                id: csvrow[2],
                                type: "Link"
                            });
                            break;
                    }
                    //console.log(csvrow);
                    //csvData.push(module);
                })
                .on('end', function() {
                    module.Links = links;
                    csvModules.push(module);
                });
        });
    });

    it('Verify dctm data', function() {
        return Promise.resolve(
            csvModules.forEach(m => {
                var ticket = "";
                var m1 = m;
                dctmLogin().then(function(dmticket) {
                    ticket = dmticket;
                    return dctm({
                        path: '/dctm/dql/execute',
                        method: 'POST',
                        dmTicket: dmticket,
                        payload: {
                            dql: "select i_chronicle_id, r_object_id from wbmd_pb_sharedmodule where title ='" + m.ModuleName + "' and wbmd_pb_disp_nm = '" + m.ModuleDisplayName + "' and not any r_version_label= 'Expired' and log_entry = 'System Generated by webmd.linklistmodules.generator'"
                        }
                    });
                }).catch(function(err) {
                    console.log(err);
                }).then(function(data) {
                    m1.rid = data.data[0][1].r_object_id;
                    m1.id = data.data[0][0].i_chronicle_id;

                }).catch(function(err) {
                    console.log(err);
                }).
                then(function() {
                    return dctm({
                        path: '/asset',
                        method: 'POST',
                        dmTicket: ticket,
                        payload: {
                            i_chronicle_id: m1.id,
                            r_object_id: m1.rid,
                            r_object_type: 'wbmd_pb_sharedmodule'
                        }
                    });
                }).catch(function(err) {
                    console.log(err);
                }).
                then(function(data) {
                    m1.dctmData = data.data;
                    moduleWithDctmData.push(m1);
                }).then(function() {
                    // Verify metadata
                    assert.equal(m1.dctmData.asset_metadata.title, m1.ModuleName, "Title is not matching");
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_disp_nm, m1.ModuleDisplayName, "ModuleDisplayName is not matching");
                    assert.equal(m1.dctmData.asset_metadata.subject, m1.Description, "Description is not matching");
                    m1.dctmData.asset_metadata.wbmd_pb_module_label1.forEach(lable => {
                        assert.equal(lable, m1.ModuleLabel1, "ModuleLabel1 is not matching");
                    });
                    m1.dctmData.asset_metadata.wbmd_pb_module_label2.forEach(lable => {
                        assert.equal(lable, m1.ModuleLabel2.split(',')[0], "ModuleLabel2 is not matching");
                    });
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_module_category, m1.Category, "wbmd_pb_module_category is not matching");
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_module_tier, m1.Tier, "Tier is not matching");
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_linked_module_id, m1.LinkedModule, "LinkedModule is not matching");
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_asset_css, m1.CSS, "CSS is not matching");
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_module_xsl, m1.XSL, "XSL is not matching");
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_module_sp_program, m1.SponsorProgram, "SponsorProgram is not matching");
                });
            }));
    });
});