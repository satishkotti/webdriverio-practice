'use strict';
var assert = require('assert');
const Promise = require('bluebird');
var LoginPage = require('./../../common/pbLogin');
var common = require('./../../common/commonLib');
var dctmService = require('../../../common/dctmService');
var request = Promise.promisifyAll(require('request'), {
    multiArgs: true
});
var pb2Config = require("../../../common/config");
var mssqlSitemanagmentDb = require("../../../common/MsSqlService");
var comm_data = global.envSettings;

var pageData = {
    r_object_id: null,
    r_object_type: "wbmd_pb_page",
    i_chronicle_id: null,
    asset_metadata: {
        wbmd_pb_isextsearchable: [1],
        wbmd_pb_ishidden: 0,
        wbmd_pb_is_gated: 0,
        wbmd_pb_is_smc: 0,
        wbmd_pb_use_art_prop_flag: 0,
        wbmd_pb_is_slotted: 0,
        wbmd_is_ssl_reqd: 0,
        wbmd_pb_slots: 0,
        wbmd_pb_is_cap: 0,
        wbmd_is_auth_reqd: 0,
        wbmd_authr_prim: "0000000000000000",
        scs_content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<?dctm original_encoding=\"UTF-8\" has_bom=\"false\" config_locator=\"091e9c5e800002d6\"?>\n<page_data><panes/><javascripts/><external_csss/></page_data>",
        wbmd_pb_isintsearchable: 1,
        wbmd_pb_skin: "/skins/ResponsiveLayout/ResponsiveLayout.aspx",
        wbmd_flexlayout_rt_css: "091e9c5e8137c985",
        wbmd_pb_node_id: 1249,
        log_entry: "Page Created",
        wbmd_pb_acl_lvl: 2,
        site_id: "3",
        wbmd_site: "1001",
        wbmd_flexlayout_pb_css: "091e9c5e8137c984",
        title: "nTestPage",
        wbmd_c_frnd_nm: "nTestPage",
        wbmd_c_asset_name: "",
        wbmd_c_channel_id: "1242",
        wbmd_lk_ttl: "nTestPage",
        wbmd_wdw_ttl: "nTestPage",
        wbmd_bus_ref: "71",
        wbmd_c_prim_top_id: "1623",
        wbmd_prog_id: "091e9c5e81348725",
        wbmd_keywords: "nTestPage",
        subject: "nTestPage",
        wbmd_desc_meta: "nTestPage"
    },
    asset_parent: [],
    asset_children: [],
    retain_lock: false,
    stage: "Preview"
};


var callweb = function(options) {
    return new Promise(function(resolve, reject) {
        request(options.url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

var callSql = function(options) {
    return new Promise(function(resolve, reject) {
        mssqlSitemanagmentDb.execute({
            query: options.query,
            callback: function(recordsets) {
                ////console.log(JSON.stringify(recordsets));
                resolve(recordsets)
            }
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

describe('Checkout a page: => ', function() {
    browser.init();
    var pageId = "";
    var page_r_Id = "";
    var dmticket = "";

    it('[page] logIn', function() {
        browser.login({
            url: common.getEnvTestUrl(),
            username: common.getQAPublicationInfo().username,
            password: common.getQAPublicationInfo().password
        });
    });

    it('[page] Click: on serach', function() {
        browser.searchCommon(pageId);
    });

    it('[page] Checkout page', function() {
        browser.checkout();
    });

    it('[page] Verify the page is checkedout in dctm', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_lock_owner from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options)
            }).then(function(dctmdata) {
                //console.log(JSON.stringify(dctmdata));
                expect(dctmdata.data[0][0].r_lock_owner).to.equal(pb2Config.dctmApiConfig.dctmUsername);
            }));
    });

    it('[page] Cancel checkout', function() {

        browser.cancelCheckout();
    });

    it('[page] Verify the page is not checkedout in dctm', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_lock_owner from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options)
            }).then(function(dctmdata) {
                //console.log(JSON.stringify(dctmdata));
                expect(dctmdata.data[0][0].r_lock_owner).to.equal('');
            }));
    });

    it('[Page] Checkout from history', function() {
        browser.checkFromHistory(1);
    });

    it('[Page][history] Verify the Page is checkedout in dctm', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_lock_owner from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options);
            }).then(function(dctmdata) {
                //console.log("Verify the Template is checkedout in dctm" + JSON.stringify(dctmdata));
                expect(dctmdata.data[0][0].r_lock_owner).to.equal(pb2Config.dctmApiConfig.dctmUsername);
            }));
    });

    it('[Page][history] Cancel checkout', function() {
        browser.cancelCheckout();
    });

    it('[Page][History] Verify the Page is not checkedout in dctm', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_lock_owner from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options)
            }).then(function(dctmdata) {
                //console.log(JSON.stringify(dctmdata));
                expect(dctmdata.data[0][0].r_lock_owner).to.equal('');
            }));
    });

    it('[Page] Publish to Staging', function() {
        browser.PublishAsset('Staging');
    });

    it('[Page][history] Verify the Page is published to Staging', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_version_label from dm_document where i_chronicle_id = '" + pageId + "' and any r_version_label = 'Staging'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options);
            }).then(function(dctmdata) {
                //console.log("Verify the Page is checkedout in dctm" + JSON.stringify(dctmdata));
                var label = '';

                //console.log("[Staging] Array length: [" + dctmdata.data[0] + "}");

                for (var i in dctmdata.data) {
                    if (dctmdata.data[i][0].r_version_label[0] == "Staging")
                        label = dctmdata.data[i][0].r_version_label[0];
                }

                expect(label).to.equal('Staging');
            }));
    });

    it('[Page] Publish to Live', function() {
        browser.PublishAsset('Live');
    });

    it('[Page] Verify the Page is published to Live', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_version_label from dm_document where i_chronicle_id = '" + pageId + "' and any r_version_label = 'Live'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options);
            }).then(function(dctmdata) {
                //console.log("Verify the Template is checkedout in dctm" + JSON.stringify(dctmdata));
                var label = '';

                //console.log("[Live] Array length: [" + dctmdata.data[0] + "}");

                for (var i in dctmdata.data) {
                    if (dctmdata.data[i][0].r_version_label[0] == "Live")
                        label = dctmdata.data[i][0].r_version_label[0];
                }

                expect(label).to.equal('Live');
            }));
    });

    it('[Page] Check asset wcm_layout_template relations', function() {
        return Promise.resolve(
            dctmLogin().then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select relation_name from dm_relation where parent_id = '" + page_r_Id + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options);
            }).then(function(dctmdata) {
                var relationName = '';

                //console.log("DctmRelation: " + JSON.stringify(dctmdata));

                for (var i in dctmdata.data) {
                    if (dctmdata.data[i][0].relation_name == "wcm_layout_template")
                        relationName = dctmdata.data[i][0].relation_name;
                }

                expect(relationName).to.equal('wcm_layout_template');
            }));
    });

    it('[Page] check site management data', function() {
        var query = "SELECT Id ,ScopeMapNodeId ,PageId ,IsCapPage ,PageType ,MapState ,ObjectId ,ObjectState ,IsExpired ,CreatedById ,CreatedDate ,LastModifiedById ,LastModifiedDate FROM dbo.ScopeMapNodePages where PageId = '" + pageId + "'"
        return Promise.resolve(
            callSql({ query: query })
            .then(function(recordsets) {
                expect(recordsets.length).to.equal(3);

                var wip = 0;
                var stageing = 0;
                var live = 0;

                for (var i in recordsets) {

                    if (recordsets[i].MapState == 1) {
                        wip = 1;
                    }

                    if (recordsets[i].MapState == 2) {
                        stageing = 1;
                    }

                    if (recordsets[i].MapState == 3) {
                        live = 1;
                    }
                }

                expect(wip).to.equal(1);
                expect(stageing).to.equal(1);
                expect(live).to.equal(1);
            })
        );
    });

    it('[Page] check Preview ATS', function() {
        var scsUrl = comm_data.ats.url + pageId;
        return Promise.resolve(
            callweb({ url: scsUrl })
            .then(function(data) {
                var checkScs = data.indexOf('<chronic_id>' + pageId + '</chronic_id>') !== -1;
                expect(checkScs).to.equal(true);
            }));
    });

    it("[Page] edit add module and publish to live", function() {
        browser.EditAndAddModule('HTML', true);
    });

    it('[Page] Check asset wbmd_pb_assetmodule relations', function() {
        return Promise.resolve(
            dctmLogin()
            .then(function(ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_object_id from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options);
            })
            .then(function(options) {

                var rObjectId = options.data[0][0].r_object_id;

                var options = {
                    method: 'post',
                    dmTicket: options.dmTicket,
                    payload: {
                        dql: "select relation_name from dm_relation where parent_id = '" + rObjectId + "' and relation_name = 'wbmd_pb_assetmodule'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options);
            }).then(function(dctmdata) {
                var relationName = '';

                for (var i in dctmdata.data) {
                    if (dctmdata.data[i][0].relation_name == "wbmd_pb_assetmodule")
                        relationName = dctmdata.data[i][0].relation_name;
                }

                expect(relationName).to.equal('wbmd_pb_assetmodule');
            }));
    });

    it('[page] Expire page', function() {
        return Promise.resolve(dctmLogin().then(function(ticket) {
            var options = {
                method: 'put',
                dmTicket: ticket,
                path: '/asset/expire',
                payload: {
                    i_chronicle_id: pageId,
                    r_object_id: page_r_Id,
                    r_object_type: 'wbmd_pb_page'
                }
            };
            return dctm(options);
        }));
    });


    before(function() {
        return Promise.resolve(
            dctmLogin()
            .then(function(dmticket) {
                pageData.asset_metadata.title = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                var options = {
                    method: 'put',
                    dmTicket: dmticket,
                    payload: pageData,
                    path: '/asset/save'
                };
                dmticket = dmticket;
                return dctm(options);

            }).then(function(assetData) {
                page_r_Id = assetData.data.r_object_id;
                pageId = assetData.data.i_chronicle_id;
                browser.addCommand('login', common.login.bind(browser));
                browser.addCommand('searchCommon', common.searchCommon.bind(browser));
                browser.addCommand('checkout', common.checkout.bind(browser));
                browser.addCommand('cancelCheckout', common.cancelCheckout.bind(browser));
                browser.addCommand('checkFromHistory', common.checkFromHistory.bind(browser));
                browser.addCommand('PublishAsset', common.PublishAsset.bind(browser));
                browser.addCommand('EditAndAddModule', common.EditAndAddModule.bind(browser));
                browser.setViewportSize({
                    width: 1024,
                    height: 768
                });
            }));
    });


    after(function() {
        //console.log("test end");
    });
});