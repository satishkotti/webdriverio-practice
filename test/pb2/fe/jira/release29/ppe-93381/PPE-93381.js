var assert = require('assert');
const Promise = require('bluebird');
var testEnv = global.testEnv;
var dctmService = require("./../../../../../common/dctmService");
var fs = require("fs");
var parse = require('csv-parse');
var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;
var folderPath = 'test/pb2/data/files-for-PPE-93381';
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

var checkMultiValues = function(value, arrayValues) {
    var exist = false;
    arrayValues.forEach(x => {
        if (x == value) {
            exist = true;
        }
    });
    return exist;
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
var checkScsLinks = function(value, links, targetAttr, linkType) {
    var exist = false;
    links.forEach(x => {
        if (x.type == linkType) {
            switch (targetAttr) {
                case "title":
                    {
                        value = replaceAll(value, "amp;", "");
                        value = replaceAll(value, "&", "")
                        var t1 = replaceAll(x.title, "&", "")
                        t1 = replaceAll(t1, "amp;", "")

                        if (t1 == value)
                            exist = true;
                    }
                    break;
                case "id":
                    {
                        if (x.id == value) exist = true;
                    }
                    break;
                case "icon":
                    {
                        if (x.icon == value) exist = true;
                    }
                    break;
            }
        }
    });

    return exist;
}

var fixNullOrEmptyId = function(value) {
    if (value == null || value == "0000000000000000")
        return "";
    return value;
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

                    switch (csvrow[0].trim()) {
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
                                icon: csvrow[3],
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
                dctmLogin().
                then(function(dmticket) {
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
                }).
                then(function(data) {
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
                }).
                then(function() {
                    // Verify metadata
                    console.log("start...")
                    assert.equal(m1.dctmData.asset_metadata.title, m1.ModuleName, "Title is not matching for sharedmodule: " + m1.id);
                    assert.equal(m1.dctmData.asset_metadata.wbmd_pb_disp_nm, m1.ModuleDisplayName, "ModuleDisplayName is not matching for sharedmodule: " + m1.id);
                    assert.equal(m1.dctmData.asset_metadata.subject, m1.Description, "Description is not matching for sharedmodule: " + m1.id);
                    console.log(m1.dctmData.asset_metadata.wbmd_pb_module_label1);
                    if (m1.dctmData.asset_metadata.wbmd_pb_module_label1 != null) {
                        m1.dctmData.asset_metadata.wbmd_pb_module_label1.forEach(label => {
                            var isExist = checkMultiValues(fixNullOrEmptyId(label), m1.ModuleLabel1.split(','));
                            console.log(label);
                            assert.equal(isExist, true, "ModuleLabel1 is not matching for sharedmodule: " + m1.id);
                        });
                    }
                    console.log(m1.dctmData.asset_metadata.wbmd_pb_module_label2);
                    if (m1.dctmData.asset_metadata.wbmd_pb_module_label2 != null) {
                        m1.dctmData.asset_metadata.wbmd_pb_module_label2.forEach(label => {
                            var isExist = checkMultiValues(fixNullOrEmptyId(label), m1.ModuleLabel2.split(','));
                            console.log(label);
                            assert.equal(isExist, true, "ModuleLabel2 is not matching for sharedmodule: " + m1.id);
                        });
                    }

                    assert.equal(fixNullOrEmptyId(m1.dctmData.asset_metadata.wbmd_pb_module_category),
                        m1.Category, "wbmd_pb_module_category is not matching for sharedmodule: " + m1.id);
                    assert.equal(fixNullOrEmptyId(m1.dctmData.asset_metadata.wbmd_pb_module_tier),
                        m1.Tier, "Tier is not matching for sharedmodule: " + m1.id);
                    assert.equal(fixNullOrEmptyId(m1.dctmData.asset_metadata.wbmd_pb_linked_module_id),
                        m1.LinkedModule, "LinkedModule is not matching for sharedmodule: " + m1.id);
                    assert.equal(fixNullOrEmptyId(m1.dctmData.asset_metadata.wbmd_pb_asset_css),
                        m1.CSS, "CSS is not matching for sharedmodule: " + m1.id);
                    assert.equal(fixNullOrEmptyId(m1.dctmData.asset_metadata.wbmd_pb_module_xsl),
                        m1.XSL, "XSL is not matching for sharedmodule: " + m1.id);
                    assert.equal(fixNullOrEmptyId(m1.dctmData.asset_metadata.wbmd_pb_module_sp_program),
                        m1.SponsorProgram, "SponsorProgram is not matching for sharedmodule: " + m1.id);

                    // Verify module xml

                    var xml = m1.dctmData.asset_metadata.scs_content;
                    var doc = new dom().parseFromString(xml);
                    var scsTitle = xpath.select("/module_data//module_title", doc)[0].firstChild.data;
                    var scsTitleId = xpath.select1("/module_data/module_link/@chronic_id", doc).value;

                    assert.equal(checkScsLinks(scsTitle, m1.Links, "title", "Title"), true, "Scs title is not matching for: " + m1.id);
                    assert.equal(checkScsLinks(scsTitleId, m1.Links, "id", "Title"), true, "Scs title id is not matching for: " + m1.id);

                    var scsEmphTitle = xpath.select("/module_data/button/button_title", doc)[0].firstChild.data;
                    var scsEmphTitleId = xpath.select1("/module_data/button/button_link/@chronic_id", doc).value;

                    assert.equal(checkScsLinks(scsEmphTitle, m1.Links, "title", "Emphasized"), true, "Emphasized title is not matching for: " + m1.id);
                    assert.equal(checkScsLinks(scsEmphTitleId, m1.Links, "id", "Emphasized"), true, "Emphasized id is not matching for: " + m1.id);

                    var result = xpath.evaluate(
                        "/module_data/links/link", // xpathExpression 
                        doc, // contextNode 
                        null, // namespaceResolver 
                        xpath.XPathResult.ANY_TYPE, // resultType 
                        null // result 
                    );

                    link = result.iterateNext();
                    var index = 0;
                    while (link) {
                        var linkXml = link.toString();
                        var LinkDoc = new dom().parseFromString(linkXml);

                        var linkId = xpath.select1("//link_link/@chronic_id", LinkDoc).value;
                        var linkTitle = xpath.select1("//link_text", LinkDoc).firstChild.data;
                        var linkIconId = xpath.select1("//link_source_icon/@chronic_id", LinkDoc).value;

                        var titleExist = checkScsLinks(linkTitle, m1.Links, "title", "Link");
                        var idExist = checkScsLinks(linkId, m1.Links, "id", "Link");
                        var iconExist = checkScsLinks(linkIconId, m1.Links, "icon", "Link");

                        assert.equal(titleExist, true, linkTitle + " doesn't exist in sharedmodule: " + m1.id);
                        assert.equal(idExist, true, linkId + " doesn't exist in sharedmodule: " + m1.id);
                        assert.equal(iconExist, true, linkIconId + " doesn't exist in sharedmodule: " + m1.id);

                        link = result.iterateNext();
                        index++;
                    }

                    assert.equal(index, (m1.Links.length - 2), "The number of links is not matching for sharedmodule: " + m1.id);
                });
            }));
    });
});