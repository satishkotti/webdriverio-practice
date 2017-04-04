var parseXml = require('../../../../../common/xml/parseXml.js');
var test = require('./../../../../common/functions/functions');
var xml2js = require('xml2js');

describe('Compare xml test', () => {
    var firsturl = 'http://ats.perf.webmd.com/ATSFile.aspx?ID=091e9c5e815ba3ec';
    var nexturl = 'http://ats.perf.webmd.com/ATSFile.aspx?ID=091e9c5e815ba3ea';
    var xml1 = {}; var xml2 = {};
    var videosCount = 0;
    before(() => {
        // return Promise.resolve(parseXml.getXmlFromUrl(firsturl, null))
        //     .then(function (result) {
        //         xml1 = test.ArrayFromJSONObj(result);
        //         return parseXml.getXmlFromUrl(nexturl, null);
        //     }).then(function (resultobj) {
        //         xml2 = test.ArrayFromJSONObj(resultobj);
        //         for (var property in xml1) {
        //             if (property.toString().startsWith('VideoTitleOverride_')) {
        //                 videosCount = videosCount + 1;
        //             }
        //         }
        //     }).catch(err => {
        //         console.log(err);
        //     });


        return Promise.resolve(test.GetXML('091e9c5e815ba3ec', 'live'))
            .then(function (result) {
                xml1 = test.ArrayFromJSONObjforMultiVideoLunch(result);
                return test.GetXML('091e9c5e815bdf80', 'live');
            }).then(function (resultobj) {
                xml2 = test.ArrayFromJSONObjforMultiVideoLunch(resultobj);
            }).catch(err => {
                console.log(err);
            });
    });

    //assertions
    it('title of both xmls should be same', () => {
        expect(xml1['title']).to.equal(xml2['title']);
    });
    it('object_name of both xmls should be same', () => {
        expect(xml1['object_name']).to.equal(xml2['object_name']);
    });

    it('object_type of both xmls should be same', () => {
        expect(xml1['object_type']).to.equal(xml2['object_type']);
    });

    it('wbmd_pb_module_category of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_category']).to.equal(xml2['wbmd_pb_module_category']);
    });

    it('wbmd_pb_dyn_module_category of both xmls should be same', () => {
        expect(xml1['wbmd_pb_dyn_module_category']).to.equal(xml2['wbmd_pb_dyn_module_category']);
    });

    it('wbmd_pb_module_label1 of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_label1']).to.equal(xml2['wbmd_pb_module_label1']);
    });

    it('wbmd_pb_module_label2 of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_label2']).to.equal(xml2['wbmd_pb_module_label2']);
    });

    it('wbmd_pb_module_sp_program of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_sp_program']).to.equal(xml2['wbmd_pb_module_sp_program']);
    });

    it('wbmd_pb_module_tier of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_tier']).to.equal(xml2['wbmd_pb_module_tier']);
    });

    it('wbmd_pb_cache_duration of both xmls should be same', () => {
        expect(xml1['wbmd_pb_cache_duration']).to.equal(xml2['wbmd_pb_cache_duration']);
    });

    it('wbmd_c_channel_ids_group of both xmls should be same', () => {
        expect(xml1['wbmd_c_channel_ids_group']).to.equal(xml2['wbmd_c_channel_ids_group']);
    });

    it('wbmd_program_group of both xmls should be same', () => {
        expect(xml1['wbmd_program_group']).to.equal(xml2['wbmd_program_group']);
    });
    it('wbmd_pb_asset_css path of both xmls should be same', () => {
        expect(xml1['wbmd_pb_asset_css_path']).to.equal(xml2['wbmd_pb_asset_css_path']);
    });
    it('wbmd_pb_asset_css object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_asset_css_object_type']).to.equal(xml2['wbmd_pb_asset_css_object_type']);
    });
    it('wbmd_pb_module_xsl path of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_xsl_path']).to.equal(xml2['wbmd_pb_module_xsl_path']);
    });
    it('wbmd_pb_module_xsl object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_module_xsl_object_type']).to.equal(xml2['wbmd_pb_module_xsl_object_type']);
    });

    // while (rowNumber > 0) {
    //     console.log(xml1["wbmd_pb_moduledataschema_path_" + rowNumber]);
    //     if (xml1["wbmd_pb_moduledataschema_path_" + rowNumber] != undefined) {
    //         it('wbmd_pb_moduledataschema path object_type of both xmls should be same', () => {
    //             expect(xml1["wbmd_pb_moduledataschema_path_" + rowNumber]).to.equal(xml2["wbmd_pb_moduledataschema_path_" + rowNumber]);
    //         });

    //         it('wbmd_pb_moduledataschema object_type object_type of both xmls should be same', () => {
    //             expect(xml1["wbmd_pb_moduledataschema_object_type_" + rowNumber]).to.equal(xml2["wbmd_pb_moduledataschema_object_type_" + rowNumber]);
    //         });
    //         rowNumber=rowNumber+1;
    //     }
    //     else {
    //         break;
    //     }
    // }

    it('wbmd_pb_owner_page_id path object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_owner_page_id_path']).to.equal(xml2['wbmd_pb_owner_page_id_path']);
    });
    it('wbmd_pb_owner_page_id object_type object_type of both xmls should be same', () => {
        expect(xml1['wbmd_pb_owner_page_id_object_type']).to.equal(xml2['wbmd_pb_owner_page_id_object_type']);
    });
    it('dnn_id object_type of both xmls should be same', () => {
        expect(xml1['dnn_id']).to.equal(xml2['dnn_id']);
    });
    it('class object_type of both xmls should be same', () => {
        expect(xml1['class']).to.equal(xml2['class']);
    });

    it('VideoBrand object_type of both xmls should be same', () => {
        expect(xml1['VideoBrand']).to.equal(xml2['VideoBrand']);
    });

    it('VideoLinkView object_type of both xmls should be same', () => {
        expect(xml1['VideoLinkView']).to.equal(xml2['VideoLinkView']);
    });
    it('ModuleDescription object_type of both xmls should be same', () => {
        expect(xml1['ModuleDescription']).to.equal(xml2['ModuleDescription']);
    });

    it('ModuleTitle object_type of both xmls should be same', () => {
        expect(xml1['ModuleTitle']).to.equal(xml2['ModuleTitle']);
    });

    it('VideoTitleOverride object_type of both xmls should be same', () => {
        while (videosCount > 0) {
            expect(xml1['VideoTitleOverride_' + videosCount]).to.equal(xml2['VideoTitleOverride_' + videosCount]);
            videosCount = videosCount - 1;
        }
    });

    it('VideoDescriptionOverride object_type of both xmls should be same', () => {
        while (videosCount > 0) {
            expect(xml1['VideoDescriptionOverride_' + videosCount]).to.equal(xml2['VideoDescriptionOverride_' + videosCount]);
            videosCount = videosCount - 1;
        }
    });
    it('videosource_chronic_id object_type of both xmls should be same', () => {
        while (videosCount > 0) {
            expect(xml1['videosource_chronic_id_' + videosCount]).to.equal(xml2['videosource_chronic_id_' + videosCount]);
            videosCount = videosCount - 1;
        }

    });



});
