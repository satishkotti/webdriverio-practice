var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../../common/config/api.config');
var manualRedirectSqlService = require('./../../../../../common/component/redirectapidb/apidb');
var envSettings = require('./../../../../../common/config/envSettings.js');
var Promise = require("bluebird");
var rp = require('request-promise');
var fs = require('fs');
var testAssetProps = smTestData.ApiTestData;
var config = envSettings.getConfig();

describe('PPE-129375:Preview links redirecting to Boots', () => {

    let records_Live = {};
    let records_Staging = {};
    let records_Preview = {};

    describe('Preview links redirecting to Boots_Live', () => {

        var CreateByID_redirecting_to_Boots_Live = {};
        var redirecting_to_Boots = {};
        var _redirecting_to_Boots_Live = {};

        before(() => {

            manualRedirectSqlService.connection = config.dbRtLive;

            return Promise.resolve
                (
                manualRedirectSqlService.redirecting_to_Boots().then(function (records) {
                    records_Live = records;
                    _redirecting_to_Boots_Live = {

                        fromChronID: records[0].content_chronic_id, toChronID: records[2].content_chronic_id

                    };

                })
                );
        });

        it('Get the Results from Api_Live', () => {

            CreateByID_redirecting_to_Boots_Live = test.PostResultredirectingtoBoots(testAssetProps.Create_Redirect_on_ChronicleIDS, _redirecting_to_Boots_Live);

        });

        it('Verify that Preview links redirecting to Boots_Live', () => {

            console.log(CreateByID_redirecting_to_Boots_Live.body.Message);
            expect(CreateByID_redirecting_to_Boots_Live.body.Status).to.equal('Success');
            expect(CreateByID_redirecting_to_Boots_Live.body.StatusCode).to.equal(1);
            expect(records_Live[0].content_chronic_id).to.equal(CreateByID_redirecting_to_Boots_Live.body.Data[0].FromChronicId);
            expect(records_Live[0].friendly_url).to.equal(CreateByID_redirecting_to_Boots_Live.body.Data[0].FromUrl);
            if (CreateByID_redirecting_to_Boots_Live.body.Data[0].FromPage_SiteId == "3") {
                expect(parseInt(records_Live[0].site_id)).to.equal(CreateByID_redirecting_to_Boots_Live.body.Data[0].FromPage_SiteId);
            }
            else if (CreateByID_redirecting_to_Boots_Live.body.Data[0].FromPage_SiteId == "8") {
                expect(parseInt(records_Live[1].site_id)).to.equal(CreateByID_redirecting_to_Boots_Live.body.Data[0].FromPage_SiteId);
            }
            expect(records_Live[0].PREFIX).to.equal(CreateByID_redirecting_to_Boots_Live.body.Data[0].FromPage_Prefix);

        });
    });

    describe('Preview links redirecting to Boots_Staging', () => {

        var CreateByID_redirecting_to_Boots_Staging = {};
        var redirecting_to_Boots = {};
        var _redirecting_to_Boots_Staging = {};

        before(() => {

            manualRedirectSqlService.connection = config.dbRtStaging;

            return Promise.resolve
                (
                manualRedirectSqlService.redirecting_to_Boots().then(function (records) {

                    records_Staging = records;
                    _redirecting_to_Boots_Staging = {

                        fromChronID: records[0].content_chronic_id, toChronID: records[2].content_chronic_id

                    };

                })
                );
        });

        it('Get the Results from Api_Staging', () => {

            CreateByID_redirecting_to_Boots_Staging = test.PostResultredirectingtoBoots(testAssetProps.Create_Redirect_on_ChronicleIDS, _redirecting_to_Boots_Staging);

        });

        it('Verify that Preview links redirecting to Boots_Staging', () => {

            console.log(CreateByID_redirecting_to_Boots_Staging.body.Message);
            expect(CreateByID_redirecting_to_Boots_Staging.body.Status).to.equal('Success');
            expect(CreateByID_redirecting_to_Boots_Staging.body.StatusCode).to.equal(1);
            expect(records_Staging[0].content_chronic_id).to.equal(CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromChronicId);
            expect(records_Staging[0].friendly_url).to.equal(CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromUrl);
            if (CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromPage_SiteId == "3") {
                expect(parseInt(records_Staging[0].site_id)).to.equal(CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromPage_SiteId);
            }
            else if (CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromPage_SiteId == "8") {
                expect(parseInt(records_Staging[1].site_id)).to.equal(CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromPage_SiteId);
            }

            expect(records_Staging[0].PREFIX).to.equal(CreateByID_redirecting_to_Boots_Staging.body.Data[0].FromPage_Prefix);

        });
    });
    describe('Preview links redirecting to Boots_Preview', () => {

        var CreateByID_redirecting_to_Boots_Preview = {};
        var redirecting_to_Boots = {};
        var _redirecting_to_Boots_Preview = {};

        before(() => {

            manualRedirectSqlService.connection = config.dbRtPreview;

            return Promise.resolve
                (
                manualRedirectSqlService.redirecting_to_Boots().then(function (records) {

                    records_Preview = records;
                    _redirecting_to_Boots_Preview = {

                        fromChronID: records[0].content_chronic_id, toChronID: records[2].content_chronic_id

                    };

                })
                );
        });

        it('Get the Results from Api_Preview', () => {

            CreateByID_redirecting_to_Boots_Preview = test.PostResultredirectingtoBoots(testAssetProps.Create_Redirect_on_ChronicleIDS, _redirecting_to_Boots_Preview);

        });

        it('Verify that Preview links redirecting to Boots_Preview', () => {

            console.log(CreateByID_redirecting_to_Boots_Preview.body.Message);
            expect(CreateByID_redirecting_to_Boots_Preview.body.Status).to.equal('Success');
            expect(CreateByID_redirecting_to_Boots_Preview.body.StatusCode).to.equal(1);
            expect(records_Preview[0].content_chronic_id).to.equal(CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromChronicId);
            expect(records_Preview[0].friendly_url).to.equal(CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromUrl);
            if (CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromPage_SiteId == "3") {
                expect(parseInt(records_Preview[0].site_id)).to.equal(CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromPage_SiteId);
            }
            else if (CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromPage_SiteId == "8") {
                expect(parseInt(records_Preview[1].site_id)).to.equal(CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromPage_SiteId);
            }
            expect(records_Preview[0].PREFIX).to.equal(CreateByID_redirecting_to_Boots_Preview.body.Data[0].FromPage_Prefix);

        });
    });
});