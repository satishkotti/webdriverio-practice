'use strict';
var LoginPage = require('./../common/pbLogin');
//var webdriverio = require('webdriverio');
//var options = {     desiredCapabilities: {browserName: 'chrome'}};
//var browser = webdriverio.remote(options);

var assert = require('assert');

var common = require('./../common/commonLib');
var comm_data = require('./../data/testRunConfig');
var dctmService = require('../../common/dctmService');
const Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), {
    multiArgs: true
});
var pb2Config = require("../../common/config");


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


var dctmLogin = function () {
    return new Promise(function (resolve, reject) {
        dctmService.login({
            callback: function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body.data.loginTicket);
                }
            }
        });
    });
};

var dctm = function (options) {
    return new Promise(function (resolve, reject) {
        dctmService.execute({
            uri: options.path,
            method: options.method,
            dmTickets: options.dmTicket,
            body: options.payload,
            callback: function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            }
        })
    });
}

describe('Checkout a page: => ', function () {
    browser.init();
    var pageId = "";
    var page_r_Id = "";
    var dmticket = "";

    it('[page] logIn', function () {
        browser.login(comm_data.testData);
    });

    it('[page] Click: on serach', function () {
        browser.searchCommon(pageId);
    });

    it('[page] Checkout page', function () {
        browser.checkout();
    });

    it('[page] Verify the page is checkedout in dctm', function () {
        return Promise.resolve(
            dctmLogin().then(function (ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_lock_owner from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options)
            }).then(function (dctmdata) {
                console.log(JSON.stringify(dctmdata));
                expect(dctmdata.data[0][0].r_lock_owner).to.equal(pb2Config.dctmApiConfig.dctmUsername);
            }));
    });

    it('[page] Cancel checkout', function () {

        browser.cancelCheckout();
    });

    it('[page] Verify the page is not checkedout in dctm', function () {
        return Promise.resolve(
            dctmLogin().then(function (ticket) {
                var options = {
                    method: 'post',
                    dmTicket: ticket,
                    payload: {
                        dql: "select r_lock_owner from dm_document where i_chronicle_id = '" + pageId + "'"
                    },
                    path: '/dctm/dql/execute'
                };

                return dctm(options)
            }).then(function (dctmdata) {
                console.log(JSON.stringify(dctmdata));
                expect(dctmdata.data[0][0].r_lock_owner).to.equal('');
            }));
    });

    it('[page] Expire page', function () {
        dctmLogin().then(function (ticket) {
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
        });
    });


    before(function () {
        return Promise.resolve(
            dctmLogin()
            .then(function (dmticket) {
                pageData.asset_metadata.title = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                var options = {
                    method: 'put',
                    dmTicket: dmticket,
                    payload: pageData,
                    path: '/asset/save'
                };
                dmticket = dmticket;
                return dctm(options);

            }).then(function (assetData) {
                page_r_Id = assetData.data.r_object_id;
                pageId = assetData.data.i_chronicle_id;
                browser.addCommand('login', common.login.bind(browser));
                browser.addCommand('searchCommon', common.searchCommon.bind(browser));
                browser.addCommand('checkout', common.checkout.bind(browser));
                browser.addCommand('cancelCheckout', common.cancelCheckout.bind(browser));
                browser.setViewportSize({
                    width: 1024,
                    height: 768
                });
            }));
    });


    after(function () {
        console.log("test end");
    });
});