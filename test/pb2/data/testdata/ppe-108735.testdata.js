const randomstring = require('randomstring');

module.exports = {
    Page: function (name) {
        let assetName = name + randomstring.generate(5);
        return {
            "type": "inherited",
            "inheritFrom": "Base Template [HCLayout]",
            "layout": null,
            "layoutCSS": null,
            "pageName": assetName,
            "friendlyName": assetName,
            "channel": null,
            "programCollection": null,
            "isCAP": 0,
            "isDefault": 0,
            "useArticleProperties": 0,
            "linkTitle": assetName + "-lkttl",
            "windowTitle": assetName + "-wdttl",
            "contentClassification": "Article within Article",
            "contentFilter": null,
            "primaryTopicID": "ADD-ADHD",
            "sponsorProgram": null,
            "keywords": assetName + "-kw",
            "userDesc": assetName + "-ud",
            "metaDesc": assetName + "-md",
            "isGated": 0,
            "sslRequired": 0,
            "tier": "tier2",
            "collectionCategory": null,
            "secondaryTopicID": null,
            "pageThumbnail": null,
            "publication": null,
            "healthRefType": null,
            "authRequired": "No",
            "webmdNickname": null,
            "internallySearchable": 1,
            "externallySearchable": 1
        }
    },

    LinkListModule: function (assetName) {
        let random = randomstring.generate(5);
        return {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "LinkList",
            "category": null,
            "selectXSL": 'Footer v2',
            "selectCSS": 'Standard',
            "dynamicModuleCategory": null,
            "moduleLabel1": null,
            "moduleLabel2": null,
            "linkedModule": null,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "tier": 2,
            "moduleTitle":
            {
                "moduleTitle": "Testing PPE-108735",
                "link": null
            },
            "moduleLinks": [],
            "emphasizedLinks":
            {
                "linkText": null,
                "link": null
            }
        }
    },
    moduleLinksSet: function(){
        let random = randomstring.generate(5);
        return {
            "moduleLinks":
            [
                {
                    "linkText": "Unencoded external url",
                    "link": "https://www.google.com/search?q=webmd&oq=webmd&aqs=chrome..69i57j69i60l4j69i65.8164j0j7&sourceid=chrome&ie=UTF-8" + random,
                    "icon": null
                },
                {
                    "linkText": "Encoded external url",
                    "link": encodeURI("https://www.google.com/search?q=webmd&oq=webmd&aqs=chrome..69i57j69i60l4j69i65.8164j0j7&sourceid=chrome&ie=UTF-8" + randomstring.generate(5)),
                    "icon": null
                },
                {   
                    "linkText": "Enencoded external url thats equivalent to unencoded url",
                    "link": encodeURI("https://www.google.com/search?q=webmd&oq=webmd&aqs=chrome..69i57j69i60l4j69i65.8164j0j7&sourceid=chrome&ie=UTF-8" + random),
                    "icon": null
                },
                {
                    "linkText": "Normal external url",
                    "link": "http://www.google.com",
                    "icon": null
                }
            ],
        }
    },
    sampleUri: 'login.srf?wa=wsignin1.0&rpsnv=13&ct=1495714130&rver=6.7.6643.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fmail.live.com%2Fdefault.aspx%3Frru%3Dinbox&lc=2057&id=64855&mkt=en-gb&cbcxt=mai',

    inheritedPage: function (name) {
        let assetName = name + randomstring.generate(5);
        return {
            "r_object_id": null,
            "r_object_type": "wbmd_pb_page",
            "i_chronicle_id": null,
            "asset_metadata": {
                "wbmd_pb_isintsearchable": 0,
                "wbmd_orig_pub_dt": null,
                "wbmd_flexlayout_pb_css": null,
                "wbmd_pb_isextsearchable": [0],
                "wbmd_sec_col": [],
                "wbmd_pb_ishidden": 0,
                "wbmd_pb_ref_path": "",
                "wbmd_relv3_subj_cd": [""],
                "wbmd_lk_ttl": "Test Page",
                "wbmd_prim_subj_cd": "",
                "wbmd_relv1_subj_cd": [""],
                "wbmd_pb_use_art_prop_flag": 0,
                "wbmd_pb_thmbnl": null,
                "wbmd_pb_is_gated": 0,
                "wbmd_pb_is_slotted": 0,
                "wbmd_c_audnc_lfstyl": [""],
                "wbmd_c_cons_cpy_edtr": null,
                "wbmd_pb_parenttemplate": null,
                "wbmd_c_audnc_rel_rept": [""],
                "keywords": [""],
                "wbmd_sponsor_mlr_dt": null,
                "wbmd_pb_node_id": 10648,
                "wbmd_c_audnc_gndr": "",
                "wbmd_c_edtr_revr_dt": null,
                "wbmd_pb_is_default": 0,
                "wbmd_pb_spons_clt": "",
                "wbmd_c_prim_top_id": "1623",
                "log_entry": "Test",
                "wbmd_c_audnc_age": [""],
                "wbmd_pb_acl_lvl": 2,
                "wbmd_c_tm_of_yr": [""],
                "wbmd_pb_gatedusername": "",
                "scs_content": "<?xml version=\"1.0\" encoding=\"utf-8\"?><?dctm original_encoding=\"UTF-8\" has_bom=\"false\" config_locator=\"0000000000000000\"?><page_data> <panes><pane name=\"ContentPane1\"><module chronic_id=\"091e9c5e800208c5\" r_object_id=\"091e9c5e814384b1\" class=\"HTML\" /><module chronic_id=\"091e9c5e800206c5\" r_object_id=\"091e9c5e814384b3\" class=\"CoBrand\" /><module chronic_id=\"091e9c5e800206d3\" r_object_id=\"091e9c5e814384b6\" class=\"AdModule\" /><module chronic_id=\"091e9c5e800206d9\" r_object_id=\"091e9c5e814384bc\" class=\"CoBrand\" /><module chronic_id=\"091e9c5e800206dc\" r_object_id=\"091e9c5e814384c0\" class=\"CoBrand\" /></pane><pane name=\"ContentPane2\"><module chronic_id=\"091e9c5e80023499\" r_object_id=\"091e9c5e8143819a\" class=\"Navigation\" /><module chronic_id=\"091e9c5e80020dbb\" r_object_id=\"091e9c5e814381d2\" class=\"HTML\" /></pane><pane name=\"ContentPane3\"><module chronic_id=\"091e9c5e800206ef\" r_object_id=\"091e9c5e814381fe\" class=\"Breadcrumb\" /><module chronic_id=\"091e9c5e8002aa5b\" r_object_id=\"091e9c5e814381fc\" class=\"EmailAFriend\" /></pane><pane name=\"ContentPane5\"><module chronic_id=\"***\" r_object_id=\"***\" class=\"LinkList\" /></pane><pane name=\"ContentPane23\"><module chronic_id=\"091e9c5e8002074b\" r_object_id=\"091e9c5e81673803\" class=\"LinkList\" /><module chronic_id=\"091e9c5e8002074c\" r_object_id=\"091e9c5e8143834d\" class=\"HTML\" /><module chronic_id=\"091e9c5e80020798\" r_object_id=\"091e9c5e8143835d\" class=\"AdModule\" /><module chronic_id=\"091e9c5e800207c3\" r_object_id=\"091e9c5e814386b8\" class=\"CoBrand\" /><module chronic_id=\"091e9c5e800207e4\" r_object_id=\"091e9c5e814386ba\" class=\"CoBrand\" /><module chronic_id=\"091e9c5e800208e6\" r_object_id=\"091e9c5e81597b79\" class=\"HTML\" /></pane></panes> <javascripts/> <external_csss/> </page_data> ",
                "wbmd_pb_pagetemplate": "091e9c5e806f7551",
                "wbmd_c_sec_med_revr": null,
                "wbmd_pb_spons_pgm": "",
                "wbmd_desc_meta": assetName + " - Desc",
                "wbmd_is_ssl_reqd": 0,
                "wbmd_desc_user": "",
                "wbmd_col_cat": "",
                "wbmd_pb_slots": 0,
                "wbmd_pb_spons_brand": "",
                "wbmd_c_publ_disp": "",
                "subject": assetName + " - Sub",
                "wbmd_pb_content_type": [""],
                "wbmd_relv2_subj_cd": [""],
                "wbmd_sponsor_int_mlr": null,
                "wbmd_pb_assetjs": [null],
                "wbmd_pb_is_cap": 0,
                "wbmd_flexlayout_rt_css": null,
                "wbmd_pb_copysource_id": null,
                "wbmd_keywords": "Test Page",
                "wbmd_c_stg_of_cond": "",
                "title": assetName,
                "wbmd_pb_schema_tgt": [null],
                "wbmd_pb_skin": "/skins/HCLayout/HCLayout.aspx",
                "wbmd_pb_dnn_id": 0,
                "wbmd_prim_revw_dt": null,
                "wbmd_c_frnd_nm": assetName,
                "wbmd_c_channel_id": "",
                "wbmd_c_sec_top_id": [""],
                "wbmd_authr_prim": [null],
                "wbmd_prog_col": "",
                "wbmd_med_ref_type": "",
                "wbmd_is_auth_reqd": 0,
                "wbmd_site": "1001",
                "wbmd_bus_ref": "80",
                "wbmd_pb_copy_guid": "",
                "wbmd_wdw_ttl": assetName + "-wdttl",
                "site_id": "3",
                "wbmd_c_cons_edtr": null,
                "wbmd_c_cons_revw_dt": null,
                "wbmd_c_sec_med_revw_dt": null,
                "wbmd_c_asset_name": "",
                "wbmd_pb_is_smc": 0,
                "wbmd_prog_id": null,
                "wbmd_prim_med_revr": null,
                "object_name": null,
                "wbmd_prim_col": "",
                "wbmd_sponsor_int_mlr_dt": null,
                "wbmd_publ": null,
                "wbmd_sponsor_mlr": "",
                "wbmd_pb_asset_css": null
            },
            "asset_parent": [],
            "asset_children": [],
            "retain_lock": "false"
        }
    }
}